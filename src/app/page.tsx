import Empress from '@/svg/tarot/Empress'
import ButtonLink from '@/ui/ButtonLink'
import SwipeNavigation from '@/ui/SwipeNavigation'

export default function Home() {
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
                <ButtonLink href="/story">
                    <div className="m-1 text-center text-xs">Story</div>
                </ButtonLink>
            </div>
        </div>
    )
}
