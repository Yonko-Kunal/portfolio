"use client";

import { useContext } from "react";
import {
  FisheyeContext,
  type FisheyeContextValue,
} from "@/components/fisheye/FisheyeProvider";

export function useFisheye(): FisheyeContextValue {
  const context = useContext(FisheyeContext);
  if (!context) {
    throw new Error("useFisheye must be used within a FisheyeProvider");
  }
  return context;
}
