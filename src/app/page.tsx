'use client'

import DoubleArrow from '@/svg/DoubleArrow'
import Empress from '@/svg/tarot/Empress'
import Fool from '@/svg/tarot/Fool'
import Button from '@/ui/Button'
import Swipeable from '@/ui/Swipeable'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
    const [isStoryVisible, setIsStoryVisible] = useState<boolean>(false)
    const router = useRouter()
    function handleSwipeLeft() {
        router.push('play')
    }

    function handleSwipeRight() {
        router.push('scores')
    }

    function handleSwipeUpAndButtonPress() {
        setIsStoryVisible(true)
    }

    const mainScreen = (
        <div className="relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Empress />
            </div>
            <div className="absolute top-2/5 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md" />
            <div className="text-foreground font-empress absolute top-2/5 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-5xl">
                {'The Empress Returns'}
            </div>
            <Link
                href="play"
                className="absolute right-5 bottom-10 rounded-lg p-2 backdrop-blur-xl"
            >
                <DoubleArrow className="fill-gold size-10" />
                <div className="text-gold m-1 text-center text-xs">Play</div>
            </Link>
            <Link
                href="scores"
                className="absolute bottom-10 left-5 rounded-lg p-2 backdrop-blur-xl"
            >
                <DoubleArrow className="fill-gold size-10 rotate-180" />
                <div className="text-gold m-1 text-center text-xs">Scores</div>
            </Link>
            <div className="bg-background absolute bottom-5 left-1/2 -translate-x-1/2 rounded-xl">
                <Button handleButtonPress={handleSwipeUpAndButtonPress}>
                    <div className="text-gold m-1 text-center text-xs">
                        Story
                    </div>
                </Button>
            </div>
        </div>
    )

    const storyScreen = (
        <div className="relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
                <Fool />
            </div>
            <div className="bg-background absolute top-5 left-1/2 -translate-x-1/2 rounded-xl">
                <Button handleButtonPress={() => setIsStoryVisible(false)}>
                    <div className="text-gold m-1 text-center text-xs">
                        Back
                    </div>
                </Button>
            </div>
            <div className="absolute top-1/2 left-1/2 w-100 -translate-x-1/2 -translate-y-1/2">
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {
                        'As heir to the beloved Empress Reina, you have lived a life of luxury and plenty. While being royalty has its perks, you have long felt stifled by the Empress’s overbearing and critical nature, a side of her rarely seen by the adoring public.'
                    }
                </div>
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {
                        'A week ago, the Empress departed on a diplomatic mission to a neighboring kingdom, homeland of one of your good friends. This is a unique opportunity to grow your influence in the Empire, to come into your own as a ruler and define who you are as a person. When she returns, will you fade back into your mother’s shadow, or stand as a future leader the people can believe in?'
                    }
                </div>
                <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                    {
                        'You will bring to bear all the intrigue and trickery that brought the Empress to power, sending your agents across the capital to forge alliances and build the influence you will one day need to rule. As long as you can delay the Empress’s return, there is still time. Good luck.'
                    }
                </div>
            </div>
        </div>
    )

    return (
        <Swipeable
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeUp={handleSwipeUpAndButtonPress}
        >
            {isStoryVisible ? storyScreen : mainScreen}
        </Swipeable>
    )
}
