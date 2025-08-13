'use client'

import Link from 'next/link'

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-4">
            <p>Final Score: 5</p>
            <div>
                <Link
                    className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                    href="../play"
                >
                    Play again
                </Link>
            </div>
        </div>
    )
}
