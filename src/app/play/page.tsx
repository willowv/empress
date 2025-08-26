'use client'

import { useState } from 'react'
import Game from '@/game/Game'
import { getTodayWithoutTime } from 'app/util'
export default function Home() {
    const [selectedDate] = useState<Date>(getTodayWithoutTime)
    return (
        <div className="not-motion-reduce:animate-slidefromright">
            <Game date={selectedDate} />
        </div>
    )
}
