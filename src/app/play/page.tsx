'use client'

import { useState } from 'react'
import Game from '@/game/Game'
import { getTodayWithoutTime } from 'app/util'
export default function Home() {
    const [selectedDate] = useState<Date>(getTodayWithoutTime)
    return <Game date={selectedDate} />
}
