export type FisheyeMode = "normal" | "fisheye";

export const FISHEYE_CONFIG = {
  /** localStorage key for persisting viewing mode preference */
  storageKey: "fisheye-viewing-mode",

  /** DOM id of the SVG displacement filter */
  filterId: "global-fisheye-filter",

  /** Transition duration between Normal and Fisheye modes (ms) */
  transitionDurationMs: 700,

  /**
   * Subtle barrel distortion curvature (~20% of available visual range).
   * Controls center magnification and edge curvature without hurting usability.
   */
  curvature: 0.12,

  /** Maximum pixel resolution along the longest axis of the generated displacement map */
  maxMapDimension: 256,

  /** Responsive breakpoints (px) */
  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },

  /** Responsive distortion multipliers by viewport category */
  responsiveIntensity: {
    desktop: 1.0,
    tablet: 0.78,
    mobile: 0.55,
  },

  /** Maximum number of cached displacement maps across resizes/orientations */
  maxCacheSize: 12,
} as const;

export function getResponsiveIntensity(viewportWidth: number): number {
  if (viewportWidth < FISHEYE_CONFIG.breakpoints.mobile) {
    return FISHEYE_CONFIG.responsiveIntensity.mobile;
  }
  if (viewportWidth < FISHEYE_CONFIG.breakpoints.tablet) {
    return FISHEYE_CONFIG.responsiveIntensity.tablet;
  }
  return FISHEYE_CONFIG.responsiveIntensity.desktop;
}

let cachedSupport: boolean | null = null;

export function detectFisheyeSupport(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  if (cachedSupport !== null) {
    return cachedSupport;
  }

  try {
    const hasSvgDisplacement =
      typeof SVGFEDisplacementMapElement !== "undefined";
    const supportsFilterUrl =
      typeof CSS !== "undefined" && typeof CSS.supports === "function"
        ? CSS.supports("filter", `url(#${FISHEYE_CONFIG.filterId})`)
        : true;
    const testCanvas = document.createElement("canvas");
    const hasCanvas = Boolean(testCanvas.getContext("2d"));

    cachedSupport = hasSvgDisplacement && supportsFilterUrl && hasCanvas;
    return cachedSupport;
  } catch {
    cachedSupport = false;
    return false;
  }
}
