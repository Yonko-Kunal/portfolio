'use client';

import { type Experience, experiences } from '@/config/Experience';
import { useState } from 'react';
import { Link } from 'next-view-transitions';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceCard } from '../experience/ExperienceCard';
import { CollapsibleExperienceCard } from '@/components/experience/CollapsibleExperienceCard';
import { Button } from '../ui/button';

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
    const otherExperiences = experiences.slice(1, 4); // Show only top 3 experiences (excluding current)
    const totalExperiences = experiences.length;

    return (
        <Container className="mt-20">
            <SectionHeading subHeading="Featured" heading="Experience" />

            {/* Featured Experience - Always Expanded */}
            <div className="mt-8">
                <ExperienceCard experience={featuredExperience} />
            </div>

            {/* Other Experiences - Collapsible (Top 3 only) */}
            <div className="mt-8 flex flex-col gap-8">
                {otherExperiences.map((experience: Experience) => (
                    <CollapsibleExperienceCard
                        key={experience.company}
                        experience={experience}
                        isExpanded={expandedItems.has(experience.company)}
                        onToggle={() => toggleExpanded(experience.company)}
                    />
                ))}
            </div>

            {/* Show All Work Experiences Button */}
            {totalExperiences > 4 && (
                <div className="mt-8 flex justify-center">
                    <Button variant="outline">
                        <Link href="/work-experience">
                            Show all work experiences
                        </Link>
                    </Button>
                </div>
            )}
        </Container>
    );
}