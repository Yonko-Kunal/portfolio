"use client";

import { heroConfig } from "@/config/Hero";
import Container from "@/components/common/Container";
import { ThemeToggleButton } from "./ThemeSwitch";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import Logo from "../../../public/assets/Logo";
import { Separator } from "../ui/separator";

// Create motion component outside the Navbar component
const MotionContainer = motion.create(Container);

const Navbar = () => {
  const navItems = [
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blogs",
      href: "/blogs",
    },
    {
      title: "Work",
      href: "/work-experience",
    },
  ];

  const { avatar } = heroConfig;
  const [hoverd, setHoverd] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (


    <motion.nav className="fixed border-b border-currentColor/20 top-0 left-0 right-0 z-9999 flex items-center justify-between px-2 bg-background">
      <Container className="flex items-center justify-between  max-w-5xl border-l border-r border-currentColor/20 px-1">

        <Link href="/">
          <div>
            {/* <Image className='rounded-full transition-all duration-300 ease-in-out hover:scale-90'
                                src={avatar}
                                alt="avatar"
                                width={48}
                                height={48}
                            /> */}
            <Logo className="h-10 w-10 text-black transition-all duration-300 ease-in-out md:h-10 md:w-10 dark:text-white" />
          </div>
        </Link>

        <div className="flex items-center">
          <div>
            <ul className="flex gap-1 p-2 pr-0 md:p-1">
              <li className="transition-ease gap-4">
                {navItems.map((items, idx) => (
                  <Link
                    className={`relative px-2 py-1 font-mono md:text-[12px] text-sm font-medium hover:text-yellow-500 ${usePathname() === items.href ? "text-yellow-500" : ""
                      }`}
                    href={items.href}
                    key={idx}
                    onMouseEnter={() => setHoverd(idx)}
                    onMouseLeave={() => setHoverd(null)}
                  >
                    {hoverd === idx && (
                      <motion.span
                        transition={{
                          ease: "anticipate",
                          delay: 0.01,
                        }}
                        layoutId="hovered-span"
                        className="absolute inset-0 mt-auto h-px w-full bg-yellow-500"
                      />
                    )}
                    {items.title}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
          <Separator orientation="vertical" className="h-6! w-px!" />
          <ThemeToggleButton variant="circle" start="dynamic" blur />
        </div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
