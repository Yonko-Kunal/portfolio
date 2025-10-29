import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

import Container from '@/components/common/Container';
import Skill from '@/components/common/Skill';
import CV from '@/components/svgs/CV';
import Chat from '@/components/svgs/Chat';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const buttonIcons = {
    CV: CV,
    Chat: Chat,
};

export default function Hero() {
    const { name, title, avatar, skills, description, buttons } = heroConfig;

    const renderDescription = () => {
        const parts = parseTemplate(description.template, skills);
        return parts.map((part) => {
            if (part.type === 'skill' && 'skill' in part && part.skill) {
                const SkillComponent =
                    skillComponents[part.skill.component as keyof typeof skillComponents];
                return (
                    <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
                        <SkillComponent />
                    </Skill>
                );
            } else if (part.type === 'bold' && 'text' in part) {
                return (
                    <strong key={part.key} className="font-semibold text-foreground">
                        {part.text}
                    </strong>
                );
            } else if (part.type === 'text' && 'text' in part) {
                return (
                    <span key={part.key}>
                        {part.text}
                    </span>
                );
            }
            return null;
        });
    };

    return (
        <Container className="mx-auto max-w-5xl">
            {/* Image */}
            <Image
                src={avatar}
                alt="hero"
                width={100}
                height={100}
                className="size-24 rounded-full dark:bg-yellow-300 bg-blue-300"
            />

            {/* Text Area */}
            <div className="mt-8 flex flex-col gap-4">
                <h1 className="text-4xl font-bold leading-tight">
                    Hi, I&apos;m {name} —{' '}
                    <span className="text-secondary text-[35px]">{title}</span>
                </h1>
                <div className="text-base md:text-lg text-neutral-500 leading-relaxed">
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                        {renderDescription()}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
                {buttons.map((button, index) => {
                    const IconComponent =
                        buttonIcons[button.icon as keyof typeof buttonIcons];
                    return (
                        <Button
                            key={index}
                            variant={button.variant as 'outline' | 'default'}
                            className={cn(
                                button.variant === 'outline' &&
                                'inset-shadow-indigo-500',
                                button.variant === 'default' &&
                                'inset-shadow-indigo-500',
                            )}
                        >
                            {IconComponent && <IconComponent />}
                            <Link href={button.href}>{button.text}</Link>
                        </Button>
                    );
                })}
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-2">
                {socialLinks.map((link) => (
                    <Tooltip key={link.name} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Link
                                href={link.href}
                                key={link.name}
                                className="text-secondary flex items-center gap-2"
                            >
                                <span className="size-6">{link.icon}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{link.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </Container>
    );
}