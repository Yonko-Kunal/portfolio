import { FISHEYE_CONFIG } from "@/config/Fisheye";

export interface DisplacementMapResult {
  dataUrl: string;
  maxScalePx: number;
  mapWidth: number;
  mapHeight: number;
}

const displacementMapCache = new Map<string, DisplacementMapResult>();

/**
 * Quantizes viewport dimensions to 16px buckets to avoid excessive regeneration
 * during continuous window resizing while remaining aspect-accurate.
 */
function quantizeDimension(value: number): number {
  return Math.max(16, Math.round(value / 16) * 16);
}

/**
 * Generates and caches a radial barrel-distortion displacement map as a PNG data URL.
 *
 * The map encodes normalized pixel offsets in the Red (X) and Green (Y) channels
 * centered at 127.5 (neutral = no displacement).
 *
 * Formula:
 *   r^2 = (u^2 + v^2) / 2  where u, v in [-1, 1]
 *   factor = -curvature * (1 - 2 * r^2)
 *   - At center (r = 0): factor = -curvature -> slight magnification
 *   - At edge midpoints (r^2 = 0.5): factor = 0 -> prevents navbar/edge clipping
 *   - Toward corners (r^2 -> 1): curves straight lines outward smoothly
 */
export function generateDisplacementMap(
  viewportWidth: number,
  viewportHeight: number,
  curvature: number = FISHEYE_CONFIG.curvature,
): DisplacementMapResult | null {
  if (
    typeof document === "undefined" ||
    viewportWidth <= 0 ||
    viewportHeight <= 0
  ) {
    return null;
  }

  const qW = quantizeDimension(viewportWidth);
  const qH = quantizeDimension(viewportHeight);
  const cacheKey = `${qW}x${qH}:${curvature.toFixed(4)}`;

  const cached = displacementMapCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const longest = Math.max(qW, qH);
  const scaleRatio = FISHEYE_CONFIG.maxMapDimension / longest;
  const mapWidth = Math.max(32, Math.round(qW * scaleRatio));
  const mapHeight = Math.max(32, Math.round(qH * scaleRatio));

  const canvas = document.createElement("canvas");
  canvas.width = mapWidth;
  canvas.height = mapHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const imageData = ctx.createImageData(mapWidth, mapHeight);
  const data = imageData.data;

  const halfW = qW * 0.5;
  const halfH = qH * 0.5;
  const maxScalePx = Math.max(1, curvature * Math.max(halfW, halfH));

  for (let py = 0; py < mapHeight; py++) {
    const v = ((py + 0.5) / mapHeight) * 2 - 1;
    const v2 = v * v;

    for (let px = 0; px < mapWidth; px++) {
      const u = ((px + 0.5) / mapWidth) * 2 - 1;
      const r2 = (u * u + v2) * 0.5;
      const factor = -curvature * (1 - 2 * r2);

      const dxPx = u * halfW * factor;
      const dyPx = v * halfH * factor;

      const normX = Math.max(-1, Math.min(1, dxPx / maxScalePx));
      const normY = Math.max(-1, Math.min(1, dyPx / maxScalePx));

      const idx = (py * mapWidth + px) * 4;
      data[idx] = Math.round(127.5 + 127.5 * normX);
      data[idx + 1] = Math.round(127.5 + 127.5 * normY);
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const dataUrl = canvas.toDataURL("image/png");

  const result: DisplacementMapResult = {
    dataUrl,
    maxScalePx,
    mapWidth,
    mapHeight,
  };

  if (displacementMapCache.size >= FISHEYE_CONFIG.maxCacheSize) {
    const firstKey = displacementMapCache.keys().next().value;
    if (firstKey !== undefined) {
      displacementMapCache.delete(firstKey);
    }
  }
  displacementMapCache.set(cacheKey, result);

  return result;
}
