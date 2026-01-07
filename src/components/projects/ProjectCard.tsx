"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Project } from "@/types/Project";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

import ArrowRight from "../svgs/ArrowRight";
import GithubIcon from "../svgs/GithubIcon";
import PlayCircle from "../svgs/PlayCircle";
import Website from "../svgs/Website";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LinkArrow from "../svgs/LinkArrow";
import Play from "../svgs/Play";

interface ProjectCardProps {
  project: Project;
}

const MotionCard = motion.create(Card);

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <MotionCard
      initial="initial"
      whileHover="hover"
      animate={isMobile ? "hover" : "initial"}
      className="group h-full w-full overflow-hidden rounded-none border-black/5 p-0 shadow-none transition-all dark:border-white/5"
    >
      <CardHeader className="p-0">
        <div className="group relative aspect-video overflow-hidden">
          <Link href={project.projectDetailsPageSlug}>
            <Image
              className="h-full w-full cursor-pointer object-cover transition-all duration-300 group-hover:scale-105"
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              placeholder="blur"
            />
          </Link>
          {project.video && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:backdrop-blur-xs">
                  <button className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 group-hover:cursor-pointer hover:bg-white/30">
                    <PlayCircle />
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-4xl border-0 p-0">
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full rounded-lg object-cover"
                    src={project.video}
                    autoPlay
                    loop
                    controls
                  />
                </div>
                <DialogTitle className="sr-only">{project.title}</DialogTitle>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4">
        <div className="space-y-4">
          {/* Project Header - Title and Icons */}
          <div className="flex items-center justify-between gap-4">
            <Link
              className="hover:underline hover:underline-offset-4"
              href={project.projectDetailsPageSlug}
            >
              <h3 className="text-xl leading-tight font-bold hover:cursor-pointer">
                {project.title}
              </h3>
            </Link>
          </div>

          {/* Description */}
          <p className="text-secondary text-md line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div>
            <h4 className="text-secondary text-bg-red-500 mb-2 text-sm font-medium">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                      {technology.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{technology.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      {project.details && (
        <CardFooter className="flex justify-between p-4 pt-0">
          <div
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
              project.isWorking
                ? "border-green-300 bg-green-500/10"
                : "border-red-300 bg-red-500/10"
            }`}
          >
            {project.isWorking ? (
              <>
                <div className="size-2 animate-pulse rounded-full bg-green-500 text-sm" />
                <p className="text-sm">All Systems Operational</p>
              </>
            ) : (
              <>
                <div className="size-2 animate-pulse rounded-full bg-red-500 text-sm" />
                <p className="text-sm">Building</p>
              </>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={project.link}
                target="_blank"
                className="group/details text-secondary hover:text-primary flex items-center gap-2 overflow-hidden"
              >
                <motion.div
                  variants={{
                    initial: { y: "100%", opacity: 0 },
                    hover: { y: 0, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#28D865] hover:bg-[#28D865]/80"
                >
                  <Play />
                </motion.div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Live</p>
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      )}
    </MotionCard>
  );
}
