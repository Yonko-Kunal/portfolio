import React from 'react'
import { ScalesContainer } from "@/components/ui/scales";
import Container from './Container';

const DividerScales = () => {
    return (
        <ScalesContainer>
            <Container className='border-l border-r border-currenColor/20'>
                <div className='h-8 w-full'></div>
            </Container>
        </ScalesContainer>
    )
}

export default DividerScales