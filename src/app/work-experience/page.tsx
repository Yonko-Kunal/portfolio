"use client";

import { type Experience, experiences } from "@/config/Experience";
import { useState } from "react";
import Link from "next/link";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { CollapsibleExperienceCard } from "@/components/experience/CollapsibleExperienceCard";
import { Button } from "@/components/ui/button";

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (company: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(company)) {
      newExpanded.delete(company);
    } else {
      newExpanded.add(company);
    }
    setExpandedItems(newExpanded);
  };

  const featuredExperience = experiences[0]; // First experience is featured (current job)

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Experience" />

      {/* Featured Experience - Always Expanded */}
      <div className="mt-8">
        <ExperienceCard experience={featuredExperience} />
      </div>
    </Container>
  );
}
