"use client";

import { ProjectImage } from "./ProjectImage";
import { projects } from "@/config/Projects";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "../common/Container";
import Image from "next/image";
import { Link } from "next-view-transitions";
import GithubIcon from "../svgs/GithubIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "motion/react";
import Play from "../svgs/Play";
import { Button } from "../ui/button";
import SectionHeading from "../common/SectionHeading";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const AccordionProject = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleValueChange = (value: string) => {
    setOpenAccordion(value === openAccordion ? null : value);
  };

  return (
    <Container className="mb-8">
      <SectionHeading subHeading="Featured" heading="Projects" />
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openAccordion || ""}
        onValueChange={handleValueChange}
      >
        {projects.map((project, index) => {
          const isOpen = openAccordion === project.title;

          return (
            <AccordionItem
              key={index}
              value={project.title}
              className="border-b border-black/10 dark:border-white/10"
            >
              <AccordionTrigger className="py-6 hover:no-underline">
                <div className="flex w-full cursor-pointer items-center gap-4 px-4">
                  <div className="relative size-12 overflow-hidden rounded-md bg-black/5 dark:bg-white/5">
                    <Image
                      src={project.logo}
                      alt={project.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <div className="text-muted-foreground flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {!isOpen &&
                          project.technologies.map((tech, i) => (
                            <motion.div
                              key={i}
                              layoutId={`tech-${project.title}-${i}`}
                              className="relative z-30 size-6"
                              transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                              }}
                            >
                              {tech.icon}
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <motion.div
                  className="flex flex-col gap-6 pt-2 pb-6"
                  layout
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Main Image */}
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    href={project.projectDetailsPageSlug}
                    title={project.title}
                    category={project.description}
                  />

                  {/* Description */}
                  <p className="text-secondary line-clamp-3 text-[16px]">
                    {project.description}
                  </p>

                  {/* Tech Stack & Controls */}
                  <div className="flex flex-col flex-wrap justify-between gap-6">
                    {/* Technology */}
                    <div className="space-y-3">
                      <h4 className="text-secondary text-[16px] font-medium">
                        Technology
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence mode="popLayout">
                          {isOpen &&
                            project.technologies.map((technology, i) => (
                              <Tooltip key={i}>
                                <TooltipTrigger>
                                  <motion.div
                                    layoutId={`tech-${project.title}-${i}`}
                                    className="relative z-30 size-8 transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
                                    transition={{
                                      duration: 0.2,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    {technology.icon}
                                  </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{technology.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Operational Status & Link */}
                    {project.details && (
                      <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
                        {/* Status */}
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

                        <div className="flex items-center gap-2">
                          {/* GitHub Link Button */}
                          {project.github && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={project.github}
                                  target="_blank"
                                  className="group relative flex size-12 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/10 hover:dark:bg-white/10"
                                >
                                  <GithubIcon className="size-6" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Github Repo</p>
                              </TooltipContent>
                            </Tooltip>
                          )}

                          {/* Live Link Button */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={project.link}
                                target="_blank"
                                className="group relative flex size-12 items-center justify-center rounded-full bg-green-500 text-black transition-transform hover:scale-105 hover:bg-green-400"
                              >
                                <Play className="size-5 fill-current" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Live Preview</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/projects">Show all projects</Link>
        </Button>
      </div>
    </Container>
  );
};

export default AccordionProject;
