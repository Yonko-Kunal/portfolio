import AWS from "@/components/technologies/AWS";
import BootStrap from "@/components/technologies/BootStrap";
import Bun from "@/components/technologies/Bun";
import CSS from "@/components/technologies/CSS";
import ExpressJs from "@/components/technologies/ExpressJs";
import Figma from "@/components/technologies//Figma";
import Html from "@/components/technologies/Html";
import JavaScript from "@/components/technologies/JavaScript";
import MongoDB from "@/components/technologies/MongoDB";
import NestJs from "@/components/technologies/NestJs";
import NextJs from "@/components/technologies/NextJs";
import NodeJs from "@/components/technologies/NodeJs";
import PostgreSQL from "@/components/technologies/PostgreSQL";
import Postman from "@/components/technologies/Postman";
import Prisma from "@/components/technologies/Prisma";
import ReactIcon from "@/components/technologies/ReactIcon";
import TailwindCss from "@/components/technologies/TailwindCss";
import TypeScript from "@/components/technologies/TypeScript";
import Vercel from "@/components/technologies/Vercel";

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    isBlur: true,
    company: "good day :3",
    position: "UX Engineer Intern",
    location: "Noida, India (On-Site)",
    image: "/assets/Company/Current/CurrentCompany.png",
    description: [
      "Built responsive landing pages using Next.js, translating Figma designs into production-ready interfaces.",
      "Implemented smooth animations and interactions using GSAP / Motion to enhance user experience.",
      "Developed and maintained reusable UI components based on design system guidelines.",
      "Collaborated on UX decisions and directly implemented improvements based on feedback and usability insights.",
      "Ensured pixel-perfect implementation and consistency between design and production.",
      "Optimized layouts for responsiveness, performance, and cross-device compatibility.",
      "Leveraged AI-assisted tools to speed up UI iteration and prototyping workflows.",
    ],
    startDate: "February 2026",
    endDate: "Present",
    technologies: [
      {
        name: "Figma",
        href: "https://figma.com/",
        icon: <Figma />,
      },
      {
        name: "Next.js",
        href: "https://nextjs.org/",
        icon: <NextJs />,
      },
      {
        name: "TypeScript",
        href: "https://typescriptlang.org/",
        icon: <TypeScript />,
      },
      {
        name: "React",
        href: "https://react.dev/",
        icon: <ReactIcon />,
      },
      {
        name: "Tailwind CSS",
        href: "https://tailwindcss.com/",
        icon: <TailwindCss />,
      },
    ],
    website: "#",
    github: "#",
    x: "#",
  },
];
