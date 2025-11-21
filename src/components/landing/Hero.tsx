import { heroConfig, skillComponents } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/common/Container';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import BlueTick from '@/components/svgs/BlueTick'
import Code from '@/components/svgs/Code'
import MapPin from '@/components/svgs/MapPin'
import Phone from '@/components/svgs/Phone'
import Message from '@/components/svgs/Message'
import Website from '../svgs/Website';
import Gender from '../svgs/Gender';

const customCssForSvg = 'dark:text-[#9F9FA9] text-[#71717B] size-5 flex shrink-0 items-center justify-center rounded-sm border border-muted-foreground/15 bg-muted ring-1 ring-muted-foreground/15 ring-edge ring-offset-1 ring-offset-background p-0.5';

export default function Hero() {
    const { name, title, avatar, banner, role, location, email, phone, website, gender } = heroConfig;

    // const renderDescription = () => {
    //     const parts = parseTemplate(description.template, skills);
    //     return parts.map((part) => {
    //         if (part.type === 'skill' && 'skill' in part && part.skill) {
    //             const SkillComponent =
    //                 skillComponents[part.skill.component as keyof typeof skillComponents];
    //             return (
    //                 <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
    //                     <SkillComponent />
    //                 </Skill>
    //             );
    //         } else if (part.type === 'bold' && 'text' in part) {
    //             return (
    //                 <strong key={part.key} className="font-semibold text-foreground">
    //                     {part.text}
    //                 </strong>
    //             );
    //         } else if (part.type === 'text' && 'text' in part) {
    //             return (
    //                 <span key={part.key}>
    //                     {part.text}
    //                 </span>
    //             );
    //         }
    //         return null;
    //     });
    // };

    return (
        <Container className=" mx-auto max-w-5xl mb-8">
            {/* Image */}
            <div className='relative'>
                {/* avatar */}
                <Image
                    src={avatar}
                    alt="hero"
                    width={200}
                    height={200}
                    className="bg-white md:size-30 size-24 rounded-full absolute md:translate-x-6 translate-x-5 md:translate-y-43 translate-y-15 z-11"
                />
                {/* banner */}
                <div className='dottedBackground md:h-[250px] h-[130px] object-cover md:rounded-2xl rounded-[10px]mb-12'>
                    <div className='overlay-1 absolute inset-0 z-10'></div>
                    <Image
                        src={banner}
                        alt="hero"
                        height={400}
                        width={1200}
                        className='md:h-[250px] h-[130px] object-cover md:rounded-2xl rounded-[10px] mb-12'
                    />
                </div>
            </div>

            {/* Text Area */}
            {/* <div className="md:mt-16 mt-12 flex flex-col gap-4">
                <h1 className="text-4xl font-bold leading-tight">
                    Hi, I&apos;m {name} —{' '}
                    <span className="text-secondary text-[35px]">{title}</span>
                </h1>
                <div className="text-base md:text-lg text-neutral-500 leading-relaxed">
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                        {renderDescription()}
                    </div>
                </div>
            </div> */}

            <div className="md:mt-16 mt-12 flex flex-col gap-8">
                <div className='flex items-start flex-col md:gap-3 gap-2'>
                    <div className='flex items-center gap-2'>
                        <h1 className="md:text-3xl text-2xl font-semibold leading-tight">
                            {name}
                        </h1>
                        <BlueTick />
                    </div>
                    <span className="text-secondary font-mono text-sm leading-relaxed">{title}</span>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 text-sm font-mono leading-relaxed border border-black/15 dark:border-white/15 rounded-lg p-4">
                    <div className='flex items-center gap-3'>
                        <div className={customCssForSvg}>
                            <Code />
                        </div>
                        <p>{role}</p>
                    </div>
                    <div className='grid md:grid-flow-col grid-flow-row grid-rows-3 gap-2'>
                        <div className='flex items-center gap-3'>
                            <div className={customCssForSvg}>
                                <MapPin />
                            </div>
                            <p>{location}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className={customCssForSvg}>
                                <Phone />
                            </div>
                            <p className='hover:underline'><a href="tel:+919870429459" target='_blank' rel='noopener noreferrer'>{phone}</a></p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className={customCssForSvg}>
                                <Message />
                            </div>
                            <p className='hover:underline'><a href="mailto:kunalroy267483@gmail.com" target='_blank' rel='noopener noreferrer'>{email}</a></p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className={customCssForSvg}>
                                <Website />
                            </div>
                            <p className='hover:underline'><a href="https://yonko-portfolio.vercel.app" target='_blank' rel='noopener noreferrer'>{website}</a></p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className={customCssForSvg}>
                                <Gender />
                            </div>
                            <p>{gender}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Buttons */}
            {/* <div className="mt-8 flex gap-4">
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
            </div> */}

            {/* Social Links */}
            {/* <div className="mt-8 flex gap-2">
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
            </div> */}
        </Container>
    );
}