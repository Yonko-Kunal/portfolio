import Container from "@/components/common/Container";
import Image from "next/image";
import React from "react";
import Yuzu from "@/../public/assets/404/yuzu-bucket.png";
import { Link } from "next-view-transitions";
import LinkArrow from "@/components/svgs/LinkArrow";
import type { Metadata } from "next";

/**
 * SEO Metadata for 404 Page
 * Optimized for search engines and social sharing
 */
export const metadata: Metadata = {
  title: "Page Not Found - 404",
  description:
    "The page you're looking for doesn't exist. Return to the homepage to continue browsing.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Page Not Found - 404",
    description: "The page you're looking for doesn't exist.",
  },
};

/**
 * NotFound Component
 * Displays a custom 404 error page with accessible navigation back to home
 */
export default function NotFound() {
  return (
    <Container>
      <main
        className="flex h-[80vh] flex-col items-center justify-center md:flex-row"
        role="main"
        aria-labelledby="error-heading"
      >
        {/* 404 Illustration */}
        <Image
          className="w-60 md:w-105"
          src={Yuzu}
          alt="404 error illustration showing a cute character in a bucket"
          priority
          width={420}
          height={420}
          quality={75}
        />

        {/* Error Message Section */}
        <section className="flex w-[20rem] flex-col justify-center md:w-full">
          <h1
            id="error-heading"
            className="mb-3 text-left text-4xl/10 font-bold text-yellow-500 md:text-5xl/11"
          >
            Looks like you are lost
          </h1>

          <p className="text-[15px]/7 text-neutral-400">
            This page doesn&apos;t exist.{" "}
            <Link
              className="inline-flex items-center gap-1 text-yellow-500 underline underline-offset-4 transition-colors hover:text-yellow-600"
              href="/"
              aria-label="Navigate back to homepage"
            >
              <span>Let&apos;s go home</span>
              <span aria-hidden="true">
                <LinkArrow />
              </span>
            </Link>
          </p>
        </section>
      </main>
    </Container>
  );
}
