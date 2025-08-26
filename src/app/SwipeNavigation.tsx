'use client'

import Swipeable from '@/ui/Swipeable'
import { notFound, usePathname, useRouter } from 'next/navigation'
import { pages, nextPage, prevPage } from './util'
import DoubleArrow from '@/svg/DoubleArrow'
import Link from 'next/link'

function getPageName(href: string) {
    switch (href) {
        case '/':
            return 'Main'
        case '/play':
            return 'Play'
        case '/scores':
            return 'Scores'
    }
}

export default function SwipeNavigation() {
    const router = useRouter()
    const currentPage = usePathname()
    if (!pages.includes(currentPage)) notFound()

    const nextPageHref = nextPage(currentPage)
    const prevPageHref = prevPage(currentPage)
    return (
        <Swipeable
            onSwipeLeft={() => router.push(nextPageHref)}
            onSwipeRight={() => router.push(prevPageHref)}
        >
            <div className="pointer-events-none relative h-screen w-screen select-none">
                <Link
                    href={nextPageHref}
                    className="pointer-events-auto absolute right-5 bottom-10 rounded-lg p-2 backdrop-blur-xl"
                >
                    <DoubleArrow className="fill-gold size-10" />
                    <div className="text-gold m-1 text-center text-xs">
                        {getPageName(nextPageHref)}
                    </div>
                </Link>
                <Link
                    href={prevPageHref}
                    className="pointer-events-auto absolute bottom-10 left-5 rounded-lg p-2 backdrop-blur-xl"
                >
                    <DoubleArrow className="fill-gold size-10 rotate-180" />
                    <div className="text-gold m-1 text-center text-xs">
                        {getPageName(prevPageHref)}
                    </div>
                </Link>
            </div>
        </Swipeable>
    )
}
