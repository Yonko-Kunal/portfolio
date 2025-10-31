import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

import Skill from '../common/Skill';
import Github from '../svgs/Github';
import LinkedIn from '../svgs/LinkedIn';
import Website from '../svgs/Website';
import X from '../svgs/X';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
    experience: Experience;
}

const parseDescription = (text: string): string => {
    return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <div className="rounded-lg">
            {/* Company Header */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    <Image
                        src={experience.image}
                        alt={experience.company}
                        width={48}
                        height={48}
                        className="size-12 rounded-md"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                            <h3
                                className={cn(
                                    'text-xl font-bold',
                                    experience.isBlur ? 'blur-[5px]' : 'blur-none',
                                )}
                            >
                                {experience.company}
                            </h3>
                            {experience.website && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={experience.website}
                                            target="_blank"
                                            className="size-4 text-neutral-500 hover:text-primary transition-colors"
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
                                            className="size-4 text-neutral-500 hover:text-primary transition-colors"
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
                                            className="size-4 text-neutral-500 hover:text-primary transition-colors"
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
                                            className="size-4 text-neutral-500 hover:text-primary transition-colors"
                                        >
                                            <Github />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>View GitHub</TooltipContent>
                                </Tooltip>
                            )}
                            {experience.isCurrent && (
                                <div className="flex items-center gap-1 rounded-md border-green-300 bg-green-500/10 px-2 py-1 text-xs">
                                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                    Working
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-secondary">{experience.position}</p>
                    </div>
                </div>
                {/* Right Side */}
                <div className="text-secondary flex flex-col md:text-right">
                    <p className="text-secondary leading-relaxed">
                        {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                    </p>
                    <p className="text-secondary leading-relaxed">{experience.location}</p>
                </div>
            </div>

            {/* Technologies */}
            <div className="mt-6">
                <h4 className="text-sm font-medium mb-3 text-secondary">
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
            <div className="mt-6">
                <div className="text-secondary leading-relaxed">
                    {experience.description.map(
                        (description: string, descIndex: number) => (
                            <p
                                key={descIndex}
                                dangerouslySetInnerHTML={{
                                    __html: `• ${parseDescription(description)}`,
                                }}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}