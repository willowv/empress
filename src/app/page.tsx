'use client'

import Empress from '@/svg/tarot/Empress'
import Button from '@/ui/Button'
import SwipeNavigation from '@/ui/SwipeNavigation'
import { useNextStep } from 'nextstepjs'

export default function Home() {
    const { startNextStep } = useNextStep()
    return (
        <div className="not-motion-reduce:animate-slidefromright relative flex flex-col items-center select-none">
            <div className="fill-gold bg-background max-h-screen">
                <SwipeNavigation>
                    <Empress />
                </SwipeNavigation>
            </div>
            <div className="absolute top-2/5 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md" />
            <div className="text-foreground font-empress absolute top-2/5 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-5xl">
                {'The Empress Returns'}
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <Button
                    handleButtonPress={() => startNextStep('site-tutorial')}
                >
                    {'What is this?'}
                </Button>
            </div>
        </div>
    )
}
