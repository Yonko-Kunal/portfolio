import Container from "@/components/common/Container";
import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
// import Experience from "@/components/landing/Experience";
import Socials from "@/components/landing/Socials";
import { GitHubContributions } from "@/components/landing/Github-Contributions";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <Container className="min-h-screen">
      <Hero />
      <Socials />
      <Projects />
      {/* <Experience /> */}
      <GitHubContributions />
      <About />
    </Container>
  );
}
