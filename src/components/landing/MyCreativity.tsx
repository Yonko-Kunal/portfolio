import React from "react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import Image from "next/image";
import work1 from "../../../public/assets/CreativeWork/work1.png";
import work2 from "../../../public/assets/CreativeWork/work2.png";
import work3 from "../../../public/assets/CreativeWork/work3.png";
import work4 from "../../../public/assets/CreativeWork/work4.png";
import work5 from "../../../public/assets/CreativeWork/work5.png";

const MyCreativity = () => {
  return (
    <Container className="flex flex-col gap-8">
      <SectionHeading subHeading="Creativity" heading="My Creative Works" />
      <InfiniteSlider speed={70} speedOnHover={1} gap={0}>
        <Image
          src={work1}
          alt="work1"
          className="h-70 w-60 rounded-md object-contain"
        />
        <Image
          src={work2}
          alt="work2"
          className="h-70 w-60 rounded-md object-contain"
        />
        <Image
          src={work3}
          alt="work3"
          className="h-70 w-60 rounded-md object-contain"
        />
        <Image
          src={work4}
          alt="work4"
          className="h-70 w-60 rounded-md object-contain"
        />
        <Image
          src={work5}
          alt="work5"
          className="h-70 w-60 rounded-md object-contain"
        />
      </InfiniteSlider>
    </Container>
  );
};

export default MyCreativity;
