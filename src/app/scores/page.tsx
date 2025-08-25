'use client'

import { useState } from 'react'
import Swipeable from '@/ui/Swipeable'
import Fortune from '@/svg/tarot/Fortune'
import Link from 'next/link'
import DoubleArrow from '@/svg/DoubleArrow'
import { useRouter } from 'next/navigation'

function getTodayWithoutTime(): Date {
    const todayWithTime: Date = new Date()
    const day: number = todayWithTime.getUTCDate()
    const month: number = todayWithTime.getUTCMonth()
    const year: number = todayWithTime.getUTCFullYear()
    return new Date(year, month, day)
}

export default function Home() {
    const [selectedDate] = useState<Date>(getTodayWithoutTime)
    const router = useRouter()

    return (
        <Swipeable
            onSwipeLeft={() => router.push('../')}
            onSwipeRight={() => router.push('play')}
        >
            <div className="relative h-screen select-none">
                <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Fortune />
                </div>
            </div>
            <Link
                href="../"
                className="absolute right-5 bottom-10 rounded-lg p-2 backdrop-blur-xl"
            >
                <DoubleArrow className="fill-gold size-10" />
                <div className="text-gold m-1 text-center text-xs">Main</div>
            </Link>
            <Link
                href="play"
                className="absolute bottom-10 left-5 rounded-lg p-2 backdrop-blur-xl"
            >
                <DoubleArrow className="fill-gold size-10 rotate-180" />
                <div className="text-gold m-1 text-center text-xs">Play</div>
            </Link>
        </Swipeable>
    )
}
