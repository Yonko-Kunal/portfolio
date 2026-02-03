"use client";

import { useLenis } from "@/lib/lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Only scroll if the pathname has actually changed
export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lastPathnameRef = useRef(pathname);

  useEffect(() => {
    // Disable browser's default scroll restoration to prevent "jump" on back
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (lastPathnameRef.current !== pathname) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      lastPathnameRef.current = pathname;
    }
  }, [pathname, lenis]);

  return null;
}
