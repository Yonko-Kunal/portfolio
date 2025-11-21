import React from 'react'
import Container from '../common/Container'
import LinkArrow from '../svgs/LinkArrow'
import { socialsConfig } from '@/config/Socials'

const Socials = () => {
    return (
        <Container className="mx-auto max-w-5xl grid md:grid-cols-2 grid-cols-1 gap-4">
            {Object.entries(socialsConfig).map(([key, social]) => (
                <a
                    href={social.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={key}
                    className='group flex items-center justify-between border border-black/10 dark:border-white/10 p-4 pr-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all'>
                    <div className='flex gap-4'>
                        <div className=" flex items-center justify-center size-12  rounded-2xl bg-black border border-black/10 dark:border-white/10 ">
                            {social.icon}
                        </div>
                        <div>
                            <p className='font-medium group-hover:underline'>{social.name}</p>
                            <p className='text-sm text-secondary'>{social.username}</p>
                        </div>
                    </div>
                    <div>
                        <LinkArrow />
                    </div>
                </a>
            ))}
        </Container>
    )
}

export default Socials