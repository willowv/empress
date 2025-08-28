'use client'

import Swipeable from '@/ui/Swipeable'
import { notFound, usePathname, useRouter } from 'next/navigation'
import { pages, nextPage, prevPage } from 'lib/util'
import React, { ReactNode } from 'react'

interface SwipeNavigationProps {
    children: ReactNode
}

export default function SwipeNavigation({ children }: SwipeNavigationProps) {
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
            {children}
        </Swipeable>
    )
}
