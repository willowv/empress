'use client'

import { usePathname } from 'next/navigation'
import DoubleArrow from '@/svg/DoubleArrow'
import Link from 'next/link'
import { getPageName, prevPage } from 'lib/util'

export default function LeftLink() {
    const currentPage = usePathname()
    const prevPageHref = prevPage(currentPage)
    return (
        <Link
            href={prevPageHref}
            className="fill-foreground text-foreground hover:fill-gold hover:text-gold flex flex-row items-center gap-0.5 rounded-lg backdrop-blur-xl"
        >
            <DoubleArrow className="size-6 rotate-180" />
            <div className="text-xs">{getPageName(prevPageHref)}</div>
        </Link>
    )
}
