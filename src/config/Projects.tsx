import Motion from "@/components/technologies/Motion";
import ReactIcon from "@/components/technologies/ReactIcon";
import TailwindCss from "@/components/technologies/TailwindCss";
import Vercel from "@/components/technologies/Vercel";
import GSAP from "@/components/technologies/GSAP";
import { Project } from "@/types/Project";

export const projects: Project[] = [
  // {
  //     title: 'NotesBuddy',
  //     description:
  //         'A comprehensive study platform with notes, flashcards, quizzes, AI chatbot, and interactive learning tools',
  //     image: '/project/notesbuddy.png',
  //     video: 'https://ik.imagekit.io/hokb3mrdr/notesbuddy.mp4?tr=orig',
  //     link: 'https://notesbuddy.in',
  //     technologies: [
  //         { name: 'Next.js', icon: <NextJs key="nextjs" /> },
  //         { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
  //         { name: 'React', icon: <ReactIcon key="react" /> },
  //         { name: 'Vercel', icon: <Vercel key="vercel" /> },
  //         { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
  //         { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  //         { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
  //         { name: 'MDX', icon: <MDXIcon key="mdx" /> },
  //     ],
  //     github: 'https://github.com/ramxcodes/notesbuddy',
  //     live: 'https://notesbuddy.in',
  //     details: true,
  //     projectDetailsPageSlug: '/projects/notesbuddy',
  //     isWorking: true,
  // },
  {
    title: "Valorant-Landing",
    description:
      "A smooth, animated recreation of the VALORANT landing page with interactive sections and an engaging, browsing experience.",
    image: "/project/valorant.png",
    // video: 'https://ik.imagekit.io/hokb3mrdr/notesbuddy.mp4?tr=orig',
    link: "https://valorant-landing-sigma.vercel.app/",
    technologies: [
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "Vercel", icon: <Vercel key="vercel" /> },
      { name: "Tailwind CSS", icon: <TailwindCss key="tailwindcss" /> },
      { name: "GSAP", icon: <GSAP key="GSAP" /> },
      { name: "Motion", icon: <Motion key="motion" /> },
    ],
    github: "https://github.com/Yonko-Kunal/valorant-landing",
    live: "https://valorant-landing-sigma.vercel.app/",
    details: true,
    projectDetailsPageSlug: "/projects/valorant",
    isWorking: true,
  },
];
