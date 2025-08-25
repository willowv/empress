'use client'

import { useState } from 'react'
import Game from '@/game/Game'

function getTodayWithoutTime(): Date {
    const todayWithTime: Date = new Date()
    const day: number = todayWithTime.getUTCDate()
    const month: number = todayWithTime.getUTCMonth()
    const year: number = todayWithTime.getUTCFullYear()
    return new Date(year, month, day)
}

export default function Home() {
    const [selectedDate] = useState<Date>(getTodayWithoutTime)
    return <Game date={selectedDate} />
}
