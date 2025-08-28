'use client'

import Empress from '@/svg/tarot/Empress'
import Fool from '@/svg/tarot/Fool'
import Button from '@/ui/Button'
import SwipeNavigation from '@/ui/SwipeNavigation'
import { useState } from 'react'

export default function Home() {
    const [isStoryVisible, setIsStoryVisible] = useState<boolean>(false)

    if (isStoryVisible)
        return (
            <div className="not-motion-reduce:animate-slidefrombottom relative h-screen select-none">
                <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
                    <SwipeNavigation>
                        <Fool />
                    </SwipeNavigation>
                </div>
                <div className="bg-background absolute bottom-5 left-1/2 -translate-x-1/2 rounded-xl">
                    <Button handleButtonPress={() => setIsStoryVisible(false)}>
                        <div className="m-1 text-center text-xs">Back</div>
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
    else
        return (
            <div className="not-motion-reduce:animate-slidefromtop relative h-screen select-none">
                <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <SwipeNavigation>
                        <Empress />
                    </SwipeNavigation>
                </div>
                <div className="absolute top-2/5 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md" />
                <div className="text-foreground font-empress absolute top-2/5 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-5xl">
                    {'The Empress Returns'}
                </div>
                <div className="bg-background absolute bottom-5 left-1/2 -translate-x-1/2 rounded-xl">
                    <Button handleButtonPress={() => setIsStoryVisible(true)}>
                        <div className="m-1 text-center text-xs">Story</div>
                    </Button>
                </div>
            </div>
        )
}
