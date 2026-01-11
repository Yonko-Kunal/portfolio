"use client";

import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

import { StaticImageData } from "next/image";
import LinkArrow from "../svgs/LinkArrow";

interface ProjectImageProps {
  src: string | StaticImageData;
  alt: string;
  href: string;
  title: string;
  category?: string;
}

export function ProjectImage({
  src,
  alt,
  href,
  title,
  category,
}: ProjectImageProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={href}>
        <Image
          src={src}
          alt={alt}
          fill
          className="cursor-pointer object-cover transition-all duration-500 hover:scale-105"
          placeholder="blur"
        />
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
          blurIntensity={0.6}
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0"
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-2 px-5 py-4">
            <p className="text-base font-medium text-white">Project Details</p>
            <LinkArrow stroke="white" />
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
