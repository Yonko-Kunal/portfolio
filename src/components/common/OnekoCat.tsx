'use client'

import { catConfig } from '@/config/cat';
import Script from 'next/script';
import React from 'react';

// const handleOnekoChage = () => {
//     console.log("Meow ?")
// }

export default function OnekoCat() {
    if (!catConfig.enabled) {
        return null;
    }

    return <Script
        src="./oneko/oneko.js"
        data-cat="./oneko/oneko-maia.gif"

    />;
}