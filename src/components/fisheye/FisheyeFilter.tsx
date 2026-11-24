"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FISHEYE_CONFIG,
  getResponsiveIntensity,
} from "@/config/Fisheye";
import { generateDisplacementMap } from "@/lib/generateDisplacementMap";
import { useFisheye } from "@/hooks/useFisheye";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function FisheyeFilter() {
  const { mode, isFilterMounted, markTransitionComplete } = useFisheye();

  const [viewport, setViewport] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const currentScaleRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTargetScaleRef = useRef<number>(0);

  // Track viewport size cleanly on resize / orientation change while filter is active
  useEffect(() => {
    if (!isFilterMounted) return;

    let resizeRaf: number | null = null;

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleResize = () => {
      if (resizeRaf !== null) {
        cancelAnimationFrame(resizeRaf);
      }
      resizeRaf = requestAnimationFrame(updateViewport);
    };

    updateViewport();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, {
      passive: true,
    });

    return () => {
      if (resizeRaf !== null) {
        cancelAnimationFrame(resizeRaf);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isFilterMounted]);

  // Generate & cache radial displacement map only when viewport dimensions change
  const mapData = useMemo(() => {
    if (!isFilterMounted || viewport.width <= 0 || viewport.height <= 0) {
      return null;
    }
    return generateDisplacementMap(viewport.width, viewport.height);
  }, [isFilterMounted, viewport.width, viewport.height]);

  const targetScale = useMemo(() => {
    if (mode !== "fisheye" || !mapData || viewport.width <= 0) {
      return 0;
    }
    return mapData.maxScalePx * getResponsiveIntensity(viewport.width);
  }, [mode, mapData, viewport.width]);

  // Animate displacement scale smoothly without React re-renders per frame
  useEffect(() => {
    if (!isFilterMounted || !mapData) return;

    const dispEl = displacementRef.current;
    if (!dispEl) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const startScale = currentScaleRef.current;
    const endScale = targetScale;

    if (Math.abs(endScale - startScale) < 0.01) {
      currentScaleRef.current = endScale;
      dispEl.setAttribute("scale", endScale.toFixed(2));
      lastTargetScaleRef.current = endScale;
      markTransitionComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      currentScaleRef.current = endScale;
      dispEl.setAttribute("scale", endScale.toFixed(2));
      lastTargetScaleRef.current = endScale;
      markTransitionComplete();
      return;
    }

    // Scale duration proportionally if reversing mid-animation
    const fullScaleReference = Math.max(
      1,
      Math.max(startScale, endScale, lastTargetScaleRef.current),
    );
    const distanceRatio = Math.min(
      1,
      Math.abs(endScale - startScale) / fullScaleReference,
    );
    const duration = Math.max(
      180,
      Math.round(FISHEYE_CONFIG.transitionDurationMs * distanceRatio),
    );
    lastTargetScaleRef.current = endScale;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);
      const nextScale = startScale + (endScale - startScale) * eased;

      currentScaleRef.current = nextScale;
      displacementRef.current?.setAttribute("scale", nextScale.toFixed(2));

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        rafIdRef.current = null;
        currentScaleRef.current = endScale;
        displacementRef.current?.setAttribute("scale", endScale.toFixed(2));
        markTransitionComplete();
      }
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isFilterMounted, mapData, targetScale, markTransitionComplete]);

  if (!isFilterMounted || !mapData || viewport.width <= 0 || viewport.height <= 0) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      className="pointer-events-none fixed top-0 left-0 h-0 w-0 overflow-hidden opacity-0"
    >
      <defs>
        <filter
          id={FISHEYE_CONFIG.filterId}
          filterUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={viewport.width}
          height={viewport.height}
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={mapData.dataUrl}
            x={0}
            y={0}
            width={viewport.width}
            height={viewport.height}
            preserveAspectRatio="none"
            result="fisheye-displacement-map"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="fisheye-displacement-map"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
