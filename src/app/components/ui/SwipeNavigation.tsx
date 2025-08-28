'use client'

import Swipeable from '@/ui/Swipeable'
import { usePathname, useRouter } from 'next/navigation'
import { pages, nextPage, prevPage } from 'lib/util'
import React, { ReactNode } from 'react'

interface SwipeNavigationProps {
    children: ReactNode
}

export default function SwipeNavigation({ children }: SwipeNavigationProps) {
    const router = useRouter()
    let currentPage = usePathname()
    if (!pages.includes(currentPage)) currentPage = '/'

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
