import Empress from '@/svg/tarot/Empress'
import SwipeNavigation from '@/ui/SwipeNavigation'

export default function Home() {
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative flex flex-col items-center select-none">
            <div className="fill-gold bg-background max-h-screen">
                <SwipeNavigation>
                    <Empress />
                </SwipeNavigation>
            </div>
            <div className="absolute top-2/5 left-1/2 h-10 w-65 -translate-x-1/2 -translate-y-1/2 rounded-xl backdrop-blur-md" />
            <div className="text-foreground font-empress absolute top-2/5 left-1/2 w-65 -translate-x-1/2 -translate-y-1/2 text-5xl">
                {'The Empress Returns'}
            </div>
        </div>
    )
}
