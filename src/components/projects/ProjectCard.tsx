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
import { useState } from "react";

import ArrowRight from "../svgs/ArrowRight";
import GithubIcon from "../svgs/GithubIcon";
import PlayCircle from "../svgs/PlayCircle";
import Website from "../svgs/Website";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import LinkArrow from "../svgs/LinkArrow";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Card className="group h-full w-full overflow-hidden rounded-none border-black/5 p-0 shadow-none transition-all dark:border-white/5">
      <CardHeader className="p-0">
        <div className="group relative aspect-video overflow-hidden">
          <Link href={project.projectDetailsPageSlug}>
            <Image
              className="h-full w-full cursor-pointer object-cover transition-all duration-300 hover:scale-105"
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
            <div className="group/icons flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-transform duration-300 group-hover/icons:scale-90 hover:scale-125!"
                    href={project.link}
                    target="_blank"
                  >
                    <Website />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Website</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  {project.github && (
                    <Link
                      className="text-secondary hover:text-primary flex size-6 items-center justify-center transition-transform duration-300 group-hover/icons:scale-90 hover:scale-125!"
                      href={project.github}
                      target="_blank"
                    >
                      <GithubIcon />
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>View GitHub</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Description */}
          <p className="text-secondary line-clamp-3 text-sm">
            {project.description}
          </p>

          {/* Technologies */}
          <div>
            <h4 className="text-secondary mb-2 text-sm font-medium">
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
          <Link
            href={project.projectDetailsPageSlug}
            className="group/details text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors hover:underline"
          >
            View Details
            <div className="transition-transform duration-300 group-hover/details:rotate-45">
              <LinkArrow />
            </div>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
