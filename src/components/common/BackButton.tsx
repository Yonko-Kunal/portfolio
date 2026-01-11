"use client";

import ArrowLeft from "@/components/svgs/ArrowLeft";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export function BackButton({ className, label = "Back" }: BackButtonProps) {
  const router = useTransitionRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className={cn("group w-fit cursor-pointer", className)}
    >
      <div className="flex items-center space-x-2">
        <ArrowLeft className="size-4" />
        <span>{label}</span>
      </div>
    </Button>
  );
}
