'use client'

import Empress from '@/svg/tarot/Empress'
import Button from '@/ui/Button'
import NavAnimator from 'app/components/navigation/NavAnimator'
import { useNextStep } from 'nextstepjs'

export default function Home() {
    const { startNextStep } = useNextStep()
    return (
        <NavAnimator thisPage="/">
            <div className="relative flex h-full flex-col items-center select-none">
                <div className="fill-gold bg-background h-full min-w-xs">
                    <Empress />
                </div>
                <div className="absolute top-2/5 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md sm:h-15 sm:w-90" />
                <div className="text-foreground font-empress absolute top-2/5 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-center text-5xl sm:w-90 sm:text-6xl">
                    {'The Empress Returns'}
                </div>
                <div className="absolute bottom-1/6 left-1/2 -translate-x-1/2 sm:bottom-5">
                    <Button
                        handleButtonPress={() => startNextStep('site-tutorial')}
                    >
                        {'What is this?'}
                    </Button>
                </div>
            </div>
        </NavAnimator>
    )
}
