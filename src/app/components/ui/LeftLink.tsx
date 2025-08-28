'use client'

import { notFound, usePathname } from 'next/navigation'
import DoubleArrow from '@/svg/DoubleArrow'
import Link from 'next/link'
import { getPageName, pages, prevPage } from 'lib/util'

export default function LeftLink() {
    const currentPage = usePathname()
    if (!pages.includes(currentPage)) notFound()

    const prevPageHref = prevPage(currentPage)
    return (
        <Link
            href={prevPageHref}
            className="pointer-events-auto absolute bottom-10 left-5 rounded-lg p-2 backdrop-blur-xl"
        >
            <DoubleArrow className="fill-gold size-10 rotate-180" />
            <div className="text-gold m-1 text-center text-xs">
                {getPageName(prevPageHref)}
            </div>
        </Link>
    )
}
