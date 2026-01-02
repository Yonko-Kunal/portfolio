import React from "react";
import Container from "../common/Container";
import LinkArrow from "../svgs/LinkArrow";
import { socialsConfig } from "@/config/Socials";

const Socials = () => {
  return (
    <Container className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
      {Object.entries(socialsConfig).map(([key, social]) => (
        <a
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          key={key}
          className="group flex cursor-pointer items-center justify-between border border-black/10 p-4 pr-2 transition-all hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
        >
          <div className="flex gap-4">
            <div className="flex items-center justify-center rounded-2xl border dark:border-white/5">
              {social.icon}
            </div>
            <div>
              <p className="font-medium underline-offset-3 group-hover:underline">
                {social.name}
              </p>
              <p className="text-secondary text-sm">{social.username}</p>
            </div>
          </div>
          <div className="transition-transform group-hover:rotate-45">
            <LinkArrow />
          </div>
        </a>
      ))}
    </Container>
  );
};

export default Socials;
