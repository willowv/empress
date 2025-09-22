'use client'

import Swipeable from '@/ui/Swipeable'
import { usePathname, useRouter } from 'next/navigation'
import { getPageName, nextPage, prevPage } from 'lib/util'
import React, { ReactNode, useState } from 'react'
import DoubleArrow from '@/svg/DoubleArrow'
import Link from 'next/link'
import { NavigationContext } from './Contexts'

interface PageNavigationProps {
    children: ReactNode
}

export default function PageNavigation({ children }: PageNavigationProps) {
    const router = useRouter()
    const currentPage = usePathname()
    const [lastPage, setLastPage] = useState<string | undefined>(undefined)
    const nextPageHref = nextPage(currentPage)
    const prevPageHref = prevPage(currentPage)
    const leftLink = prevPageHref && (
        <Link
            href={prevPageHref}
            onClick={() => setLastPage(currentPage)}
            className="fill-foreground text-foreground hover:fill-gold hover:text-gold flex flex-row items-center gap-0.5 rounded-lg backdrop-blur-xl sm:flex-col sm:gap-2"
        >
            <DoubleArrow className="size-6 rotate-180" />
            <div className="text-xs">{getPageName(prevPageHref)}</div>
        </Link>
    )
    const rightLink = nextPageHref && (
        <Link
            href={nextPageHref}
            onClick={() => setLastPage(currentPage)}
            className="fill-foreground text-foreground hover:fill-gold hover:text-gold flex flex-row items-center gap-0.5 rounded-lg backdrop-blur-xl sm:flex-col sm:gap-2"
        >
            <DoubleArrow className="order-2 size-6 sm:order-1" />
            <div className="order-1 text-xs sm:order-2">
                {getPageName(nextPageHref)}
            </div>
        </Link>
    )
    return (
        <NavigationContext value={{ lastPage }}>
            <Swipeable
                onSwipeLeft={() => {
                    if (nextPageHref === undefined) return
                    setLastPage(currentPage)
                    router.push(nextPageHref)
                }}
                onSwipeRight={() => {
                    if (prevPageHref === undefined) return
                    setLastPage(currentPage)
                    router.push(prevPageHref)
                }}
            >
                <div className="flex min-h-screen flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                    <div className="mr-5 hidden sm:block">{leftLink}</div>
                    <div key={currentPage} className="max-w-3xl">
                        {children}
                    </div>
                    <div className="ml-5 hidden sm:block">{rightLink}</div>
                    <div className="flex flex-row justify-between p-2 pb-1 sm:hidden">
                        {leftLink}
                        {rightLink}
                    </div>
                </div>
            </Swipeable>
        </NavigationContext>
    )
}
