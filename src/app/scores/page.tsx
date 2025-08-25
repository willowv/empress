'use client'

import { useState } from 'react'
import Swipeable from '@/ui/Swipeable'
import Fortune from '@/svg/tarot/Fortune'

function getTodayWithoutTime(): Date {
    const todayWithTime: Date = new Date()
    const day: number = todayWithTime.getUTCDate()
    const month: number = todayWithTime.getUTCMonth()
    const year: number = todayWithTime.getUTCFullYear()
    return new Date(year, month, day)
}

export default function Home() {
    const [selectedDate] = useState<Date>(getTodayWithoutTime)

    return (
        <Swipeable>
            <div className="relative h-screen select-none">
                <div className="fill-gold bg-background absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 opacity-70">
                    <Fortune />
                </div>
            </div>
        </Swipeable>
    )
}
