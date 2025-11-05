import Container from '@/components/common/Container'
import Image from 'next/image'
import React from 'react'
import Yuzu from '@/../public/assets/404/yuzu-bucket.png'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Container>
            <div className='flex md:flex-row flex-col items-center justify-center h-[80vh] '>
                <Image className='w-105' src={Yuzu} alt='404 image' />
                <div className='flex flex-col items-center justify-center md:w-full w-[20rem]'>
                    <h1 className='md:text-5xl/11 text-4xl/10 font-bold text-yellow-500 mb-3 text-left'>Looks like you are lost</h1>
                    <p className='text-[15px]/7 text-neutral-400'>cause this page doesn't exist <Link href={"/"}><span className='text-yellow-500 hover:text-yellow-600 hover:text-[15px]'>Let's go home</span ></Link></p>
                </div>
            </div>

        </Container >
    )
}
