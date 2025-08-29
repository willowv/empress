import Link from 'next/link'
import { ReactNode } from 'react'
import 'tailwindcss'

interface ButtonLinkProps {
    readonly children: ReactNode
    readonly href: string
}

export default function ButtonLink({ children, href }: ButtonLinkProps) {
    return (
        <Link
            className="text-foreground bg-background border-gold hover:text-gold flex h-8 min-w-16 items-center justify-center rounded-xl border-2 px-4 text-sm font-medium transition-colors disabled:border-gray-600 disabled:text-gray-600"
            href={href}
        >
            {children}
        </Link>
    )
}
