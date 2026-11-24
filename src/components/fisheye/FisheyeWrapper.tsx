"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/lib/lenis";
import { FISHEYE_CONFIG } from "@/config/Fisheye";
import { useFisheye } from "@/hooks/useFisheye";
import { FisheyeFilter } from "@/components/fisheye/FisheyeFilter";

export function FisheyeWrapper({ children }: { children: React.ReactNode }) {
  const { isFilterMounted } = useFisheye();
  const pathname = usePathname();
  const lenis = useLenis();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastWindowScrollRef = useRef<number>(0);
  const lastInnerScrollRef = useRef<number>(0);
  const wasFilterMountedRef = useRef<boolean>(false);
  const lastPathnameRef = useRef<string>(pathname);

  // Track window scroll while in Normal Mode so entering Fisheye preserves exact scroll position
  useEffect(() => {
    if (isFilterMounted) return;

    lastWindowScrollRef.current = window.scrollY;
    const handleWindowScroll = () => {
      lastWindowScrollRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [isFilterMounted]);

  // Synchronize scroll container & Lenis seamlessly when entering/exiting Fisheye Mode
  useLayoutEffect(() => {
    const wasMounted = wasFilterMountedRef.current;
    wasFilterMountedRef.current = isFilterMounted;

    if (isFilterMounted && !wasMounted) {
      const targetScroll = lastWindowScrollRef.current;
      lastInnerScrollRef.current = targetScroll;

      lenis?.stop();
      document.documentElement.style.overflow = "hidden";

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = targetScroll;
      }
    } else if (!isFilterMounted && wasMounted) {
      const targetScroll = lastInnerScrollRef.current;
      document.documentElement.style.overflow = "";

      window.scrollTo(0, targetScroll);
      lenis?.start();
      lenis?.scrollTo(targetScroll, { immediate: true });
      lastWindowScrollRef.current = targetScroll;
    }
  }, [isFilterMounted, lenis]);

  // Ensure cleanup if component unmounts unexpectedly while active
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Scroll inner viewport container to top on route navigation while Fisheye is active
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      if (isFilterMounted && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
        lastInnerScrollRef.current = 0;
      }
    }
  }, [pathname, isFilterMounted]);

  return (
    <>
      <FisheyeFilter />
      <div
        className={
          isFilterMounted
            ? "bg-background fixed inset-0 z-0 overflow-hidden"
            : undefined
        }
        style={
          isFilterMounted
            ? { filter: `url(#${FISHEYE_CONFIG.filterId})` }
            : undefined
        }
      >
        <div
          ref={scrollContainerRef}
          data-lenis-prevent={isFilterMounted ? true : undefined}
          onScroll={
            isFilterMounted
              ? (e) => {
                  lastInnerScrollRef.current = e.currentTarget.scrollTop;
                }
              : undefined
          }
          className={
            isFilterMounted
              ? "h-full w-full overflow-x-clip overflow-y-auto overscroll-contain"
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
