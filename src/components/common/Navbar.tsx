'use client'

import { heroConfig } from '@/config/Hero';
import logo from '@/../public/assets/logo.jpg'
import Container from '@/components/common/Container'
import { ThemeToggleButton } from './ThemeSwitch';
import { Link } from 'next-view-transitions'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../../../public/assets/Logo';

// Create motion component outside the Navbar component
const MotionContainer = motion(Container)

const Navbar = () => {

    const navItems = [
        {
            title: "Projects",
            href: "/projects"
        },
        {
            title: "Blogs",
            href: "/blogs"
        },
    ]

    const { avatar } = heroConfig;
    const [hoverd, setHoverd] = useState<number | null>(null)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const { scrollY } = useScroll()
    const [isMobile, setIsMobile] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 20) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    })

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);



    return (
        <MotionContainer
            animate={{
                width: isMobile
                    ? scrolled
                        ? "90%"
                        : "100%"
                    : scrolled
                        ? "36%"
                        : "100%",
                top: isMobile
                    ? scrolled
                        ? "2%" : "0rem" :
                    scrolled
                        ? "0.75rem" : "0rem",
            }}
            style={{
                border: scrolled ? "" : "none",

            }}
            transition={{
                ease: isMobile ? "circInOut" : "easeInOut",
                duration: isMobile ? 0.4 : 0.35
            }}
            className="sticky z-20 rounded-[20px] py-1 liquidGlass-wrapper"
        >
            {/* SVG Filter for Liquid Glass Effect - Inside Container */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="glass-distortion">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="1"
                            seed="5"
                            result="turbulence"
                        />
                        <feGaussianBlur
                            in="turbulence"
                            stdDeviation="3"
                            result="softMap"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="softMap"
                            scale="200"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Liquid Glass Effect Layer */}
            <div className={`liquidGlass-effect ${scrolled ? "scrolled" : ""}`} />

            <motion.nav className='relative z-10 flex items-center justify-between px-2'>
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <div>
                            {/* <Image className='rounded-full transition-all duration-300 ease-in-out hover:scale-90'
                                src={avatar}
                                alt="avatar"
                                width={48}
                                height={48}
                            /> */}
                            <Logo className="text-black dark:text-white transition-all duration-300 ease-in-out" />
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <ul className='flex gap-3 p-4 pr-0'>
                            <li className='transition-ease gap-4'>
                                {navItems.map((items, idx) => (
                                    <Link
                                        className='font-mono text-sm font-medium relative hover:text-yellow-500 px-2 py-1'
                                        href={items.href}
                                        key={idx}
                                        onMouseEnter={() => setHoverd(idx)}
                                        onMouseLeave={() => setHoverd(null)}
                                    >
                                        {hoverd === idx && (
                                            <motion.span transition={{
                                                ease: "anticipate",
                                                delay: 0.01
                                            }} layoutId='hovered-span' className='absolute mt-auto inset-0 h-px w-full bg-yellow-500' />
                                        )}
                                        {items.title}
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <ThemeToggleButton variant="circle" start="top-right" blur />
                </div>
            </motion.nav>
        </MotionContainer>
    )
}

export default Navbar