import Container from "@/components/common/Container";
import About from "@/components/landing/About";
import AccordionProject from "@/components/landing/AccordionProject";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import Experience from "@/components/landing/Experience";
import Socials from "@/components/landing/Socials";
import { GitHubContributions } from "@/components/landing/Github-Contributions";
import { cn } from "@/lib/utils";
import MyCreativity from "@/components/landing/MyCreativity"; // import Spotify from "@/components/landing/Spotify";
import DividerScales from "@/components/common/DividerScales";

export default function Home() {
  return (
    <section className="min-h-screen">

      <Hero />
      {/* <Spotify /> */}
      <DividerScales />
      <Socials />
      <DividerScales />
      {/* <Projects /> */}
      <Experience />
      <DividerScales />
      <AccordionProject />
      <DividerScales />
      <GitHubContributions />
      <DividerScales />
      <About />
      <DividerScales />
      <MyCreativity />
      <DividerScales />

    </section>
  );
}
