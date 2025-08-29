'use client'

import { usePathname } from 'next/navigation'
import DoubleArrow from '@/svg/DoubleArrow'
import Link from 'next/link'
import { getPageName, nextPage } from 'lib/util'

export default function RightLink() {
    const currentPage = usePathname()
    const nextPageHref = nextPage(currentPage)
    return (
        <Link
            href={nextPageHref}
            className="fill-foreground text-foreground hover:fill-gold hover:text-gold flex flex-row items-center gap-0.5 rounded-lg backdrop-blur-xl"
        >
            <DoubleArrow className="order-2 size-6" />
            <div className="order-1 text-xs">{getPageName(nextPageHref)}</div>
        </Link>
    )
}
