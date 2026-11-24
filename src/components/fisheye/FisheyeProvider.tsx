"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  detectFisheyeSupport,
  FISHEYE_CONFIG,
  type FisheyeMode,
} from "@/config/Fisheye";

export interface FisheyeContextValue {
  mode: FisheyeMode;
  isFisheye: boolean;
  isSupported: boolean;
  isFilterMounted: boolean;
  isTransitioning: boolean;
  setMode: (nextMode: FisheyeMode) => void;
  toggleFisheye: () => void;
  markTransitionComplete: () => void;
}

export const FisheyeContext = createContext<FisheyeContextValue | null>(null);

const subscribeNoop = () => () => {};
const getServerSupportSnapshot = () => true;

export function FisheyeProvider({ children }: { children: React.ReactNode }) {
  const isSupported = useSyncExternalStore(
    subscribeNoop,
    detectFisheyeSupport,
    getServerSupportSnapshot,
  );

  const [mode, setModeState] = useState<FisheyeMode>("normal");
  const [isFilterMounted, setIsFilterMounted] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const hasRestoredRef = useRef(false);
  const modeRef = useRef<FisheyeMode>("normal");

  // Restore persisted mode after hydration (waiting for CRT preloader if active)
  useEffect(() => {
    if (!isSupported || hasRestoredRef.current) {
      return;
    }
    hasRestoredRef.current = true;

    let savedMode: FisheyeMode = "normal";
    try {
      const stored = window.localStorage.getItem(FISHEYE_CONFIG.storageKey);
      if (stored === "fisheye") {
        savedMode = "fisheye";
      }
    } catch {
      // Ignore storage errors (private browsing / restricted contexts)
    }

    if (savedMode !== "fisheye") {
      return;
    }

    const activateFisheye = () => {
      modeRef.current = "fisheye";
      setIsFilterMounted(true);
      setIsTransitioning(true);
      setModeState("fisheye");
    };

    const preloaderEl = document.querySelector(
      '[aria-label="CRT Screen Preloader"]',
    );

    if (!preloaderEl) {
      const rafId = requestAnimationFrame(activateFisheye);
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new MutationObserver(() => {
      if (!document.querySelector('[aria-label="CRT Screen Preloader"]')) {
        observer.disconnect();
        activateFisheye();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isSupported]);

  const persistMode = useCallback((nextMode: FisheyeMode) => {
    try {
      window.localStorage.setItem(FISHEYE_CONFIG.storageKey, nextMode);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const setMode = useCallback(
    (nextMode: FisheyeMode) => {
      if (!isSupported && nextMode === "fisheye") {
        return;
      }

      persistMode(nextMode);
      modeRef.current = nextMode;

      if (nextMode === "fisheye") {
        setIsFilterMounted(true);
        setIsTransitioning(true);
        setModeState("fisheye");
      } else {
        setModeState("normal");
        if (isFilterMounted) {
          setIsTransitioning(true);
        }
      }
    },
    [isSupported, isFilterMounted, persistMode],
  );

  const toggleFisheye = useCallback(() => {
    setMode(mode === "fisheye" ? "normal" : "fisheye");
  }, [mode, setMode]);

  const markTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
    if (modeRef.current === "normal") {
      setIsFilterMounted(false);
    }
  }, []);

  const value = useMemo<FisheyeContextValue>(
    () => ({
      mode,
      isFisheye: mode === "fisheye",
      isSupported,
      isFilterMounted,
      isTransitioning,
      setMode,
      toggleFisheye,
      markTransitionComplete,
    }),
    [
      mode,
      isSupported,
      isFilterMounted,
      isTransitioning,
      setMode,
      toggleFisheye,
      markTransitionComplete,
    ],
  );

  return (
    <FisheyeContext.Provider value={value}>{children}</FisheyeContext.Provider>
  );
}
