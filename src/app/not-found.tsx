import Container from "@/components/common/Container";
import Image from "next/image";
import React from "react";
import Yuzu from "@/../public/assets/404/yuzu-bucket.png";
import Link from "next/link";
import LinkArrow from "@/components/svgs/LinkArrow";

export default function NotFound() {
  return (
    <Container>
      <div className="flex h-[80vh] flex-col items-center justify-center md:flex-row">
        <Image className="w-60 md:w-105" src={Yuzu} alt="404 image" />
        <div className="flex w-[20rem] flex-col justify-center md:w-full">
          <h1 className="mb-3 text-left text-4xl/10 font-bold text-yellow-500 md:text-5xl/11">
            Looks like you are lost
          </h1>
          <p className="text-[15px]/7 text-neutral-400">
            cause this page doesn't exist{" "}
            <Link
              className="flex items-center text-yellow-500 underline underline-offset-4 hover:text-[15px] hover:text-yellow-600"
              href={"/"}
            >
              <span>Let's go home</span>
              <span>
                <LinkArrow />
              </span>
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
