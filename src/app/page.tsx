import Container from "@/components/common/Container";
import About from "@/components/landing/About";
import Hero from "@/components/landing/Hero";
import Projects from "@/components/landing/Projects";
import Experience from "@/components/landing/Experience";
import Github from "@/components/landing/Github";
import Socials from "@/components/landing/Socials";

export default function Home() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Socials />
      <Projects />
      {/* <Experience /> */}
      <Github />
      <About />

    </Container>
  );
}
