'use client';

import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface CollapsibleExperienceCardProps {
    experience: Experience;
    isExpanded: boolean;
    onToggle: () => void;
}

const parseDescription = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function CollapsibleExperienceCard({
    experience,
    isExpanded,
    onToggle
}: CollapsibleExperienceCardProps) {
    return (
        <div className="border-none rounded-lg overflow-hidden">
            {/* Header - Always Visible */}
            <div
                className="flex items-left justify-between cursor-pointer transition-colors md:flex-row flex-col gap-2"
                onClick={onToggle}
            >
                <div className="flex items-center gap-4">
                    <Image
                        src={experience.image}
                        alt={experience.company}
                        width={40}
                        height={40}
                        className="size-10 rounded-md"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[18px] font-bold">
                                {experience.company}
                            </h3>
                            {experience.website && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={experience.website}
                                            target="_blank"
                                            className="size-4 text-neutral-500 hover:text-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Website />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>Visit Website</TooltipContent>
                                </Tooltip>
                            )}
                            {experience.x && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={experience.x}
                                            target="_blank"
                                            className="size-4 text-neutral-500 hover:text-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <X />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>Follow on X</TooltipContent>
                                </Tooltip>
                            )}
                            {experience.linkedin && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={experience.linkedin}
                                            target="_blank"
                                            className="size-4 text-neutral-500 hover:text-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <LinkedIn />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>Connect on LinkedIn</TooltipContent>
                                </Tooltip>
                            )}
                            {experience.github && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={experience.github}
                                            target="_blank"
                                            className="size-4 text-neutral-500 hover:text-primary"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>View GitHub</TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <p className="text-sm text-secondary">{experience.position}</p>
                    </div>
                </div>

                <div className="flex items-left gap-4">
                    <div className="text-righ">
                        <p className="text-secondary leading-relaxed">
                            {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                        </p>
                        <p className="text-secondary leading-relaxed">{experience.location}</p>
                    </div>
                    <div className="text-secondary">
                        {isExpanded ? (
                            <ChevronUp className="size-5" />
                        ) : (
                            <ChevronDown className="size-5" />
                        )}
                    </div>
                </div>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="">
                    {/* Technologies */}
                    <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2 text-secondary">
                            Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((technology, techIndex: number) => (
                                <Skill
                                    key={techIndex}
                                    name={technology.name}
                                    href={technology.href}
                                >
                                    {technology.icon}
                                </Skill>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <div className="text-secondary landing-relaxed">
                            {experience.description.map(
                                (description: string, descIndex: number) => (
                                    <p
                                        key={descIndex}
                                        className="leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: `• ${parseDescription(description)}`,
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}