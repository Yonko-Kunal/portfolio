import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  subHeading: string;
  heading: string;
  className?: string;
}

export default function SectionHeading({
  subHeading,
  heading,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn(className)} {...props}>
      <p className="text-secondary font-mono text-sm">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}
