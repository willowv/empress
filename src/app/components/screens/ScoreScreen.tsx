import Fortune from '@/svg/tarot/Fortune'
import Scores from 'app/scores/Scores'
import { Suspense } from 'react'
import SwipeNavigation from '@/ui/SwipeNavigation'

export default function ScoreScreen() {
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SwipeNavigation>
                    <Fortune />
                </SwipeNavigation>
            </div>
            <div className="absolute top-20 left-1/2 w-100 -translate-x-1/2">
                <Suspense>
                    <Scores />
                </Suspense>
            </div>
        </div>
    )
}
