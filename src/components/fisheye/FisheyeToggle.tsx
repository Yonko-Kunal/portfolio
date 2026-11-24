"use client";

import React from "react";
import { Aperture } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useFisheye } from "@/hooks/useFisheye";

export function FisheyeToggle({ className }: { className?: string }) {
  const { isFisheye, isSupported, toggleFisheye } = useFisheye();

  if (!isSupported) {
    return null;
  }

  const label = isFisheye ? "Disable fisheye view" : "Enable fisheye view";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleFisheye}
          aria-label={label}
          aria-pressed={isFisheye}
          className={cn(
            "relative size-10 cursor-pointer p-0 transition-all duration-300 active:scale-95",
            isFisheye && "bg-accent/70 text-yellow-500 hover:text-yellow-500",
            className,
          )}
        >
          <span className="sr-only">{label}</span>
          <Aperture
            className={cn(
              "size-4.5 transition-transform duration-500 ease-in-out",
              isFisheye && "rotate-45",
            )}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
