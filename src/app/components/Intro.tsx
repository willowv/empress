import React from 'react'
import Tarot from './svg/Tarot'
import Swipeable from './ui/Swipeable'

interface IntroProps {
    readonly handleIntroTap: () => void
}

export default function Intro({ handleIntroTap }: IntroProps) {
    return (
        <Swipeable onSwipeLeft={handleIntroTap} onSwipeRight={handleIntroTap}>
            <div
                className="relative h-screen select-none"
                onClick={handleIntroTap}
            >
                <div className="fill-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70">
                    <Tarot />
                </div>
                <div className="absolute top-1/4 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md" />
                <div className="text-foreground font-empress absolute top-1/4 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-5xl">
                    {'The Empress Returns'}
                </div>
            </div>
        </Swipeable>
    )
}
