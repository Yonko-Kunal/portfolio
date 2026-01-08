import { about, mySkills } from "@/config/About";
import Image from "next/image";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import LinkArrow from "@/components/svgs/LinkArrow";

export default function About() {
  return (
    <Container className="mb-8 flex flex-col gap-8">
      {/* About me */}
      <div className="flex flex-col gap-4">
        <SectionHeading subHeading="About" heading="Who am I ?" />
        <div className="flex flex-col gap-4 md:flex-row">
          <Image
            src="/assets/me.png"
            alt="About"
            width={300}
            height={300}
            className="size-40 rounded-md bg-white object-cover"
          />
          <div className="flex flex-col justify-center gap-8">
            <p className="text-secondary">{about.description}</p>
            <a
              href="https://www.linkedin.com/in/kunal-roy/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-2 self-end rounded-full bg-(--button-primary) py-2.5 pr-4 pl-6 font-semibold tracking-tight text-black transition-all duration-300 hover:gap-3 hover:bg-(--button-primary)/80 md:self-start"
            >
              Let's connect{" "}
              <span className="transition-transform duration-300 group-hover:rotate-45">
                <LinkArrow strokeWidth="2" />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <SectionHeading subHeading="" heading="Stack" />
        <div className="dottedBackground flex w-full flex-col items-start justify-center gap-4 border border-gray-200 p-4 dark:border-white/5">
          <div className="flex flex-wrap items-center justify-start gap-4">
            {mySkills.map((skill) => (
              <Tooltip key={skill.key}>
                <TooltipTrigger asChild>
                  <div className="size-10 hover:cursor-pointer">{skill}</div>
                </TooltipTrigger>
                <TooltipContent>{skill.key}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
