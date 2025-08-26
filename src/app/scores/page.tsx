import Fortune from '@/svg/tarot/Fortune'
import Scores from './Scores'
import { Suspense } from 'react'

export default function Home() {
    // TODO: Skeleton UI for Scores while loading
    return (
        <div className="relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Fortune />
            </div>
            <div className="absolute top-1/2 left-1/2 w-100 -translate-x-1/2 -translate-y-1/2">
                <Suspense>
                    <Scores />
                </Suspense>
            </div>
        </div>
    )
}
