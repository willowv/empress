import React from 'react'
import Empress from './svg/tarot/Empress'
import Swipeable from './ui/Swipeable'
import Chariot from './svg/tarot/Chariot'
import Fool from './svg/tarot/Fool'
import Fortune from './svg/tarot/Fortune'

interface IntroProps {
    readonly handleEndOfIntro: () => void
}

export default function Intro({ handleEndOfIntro }: IntroProps) {
    return (
        <Swipeable
            onSwipeLeft={handleEndOfIntro}
            onSwipeRight={handleEndOfIntro}
        >
            <div
                className="relative h-screen select-none"
                onClick={handleEndOfIntro}
            >
                <div className="fill-gold bg-background absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 opacity-70">
                    <Fortune />
                </div>
                <div className="fill-gold bg-background absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 opacity-70">
                    <Chariot />
                </div>
                <div className="fill-gold bg-background absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
                    <Fool />
                </div>
                <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Empress />
                </div>
                <div className="absolute top-2/5 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md" />
                <div className="text-foreground font-empress absolute top-2/5 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-5xl">
                    {'The Empress Returns'}
                </div>
            </div>
        </Swipeable>
    )
}
