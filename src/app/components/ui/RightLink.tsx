'use client'

import { notFound, usePathname } from 'next/navigation'
import DoubleArrow from '@/svg/DoubleArrow'
import Link from 'next/link'
import { getPageName, pages, nextPage } from 'lib/util'

export default function RightLink() {
    const currentPage = usePathname()
    if (!pages.includes(currentPage)) notFound()

    const nextPageHref = nextPage(currentPage)
    return (
        <Link
            href={nextPageHref}
            className="pointer-events-auto absolute right-5 bottom-10 rounded-lg p-2 backdrop-blur-xl"
        >
            <DoubleArrow className="fill-gold size-10" />
            <div className="text-gold m-1 text-center text-xs">
                {getPageName(nextPageHref)}
            </div>
        </Link>
    )
}
