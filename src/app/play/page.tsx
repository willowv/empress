'use client'

import { useState } from 'react'
import GameScreen from '@/screens/GameScreen'
import { getTodayWithoutTime } from 'lib/util'
import GameSelectScreen from '@/screens/GameSelectScreen'
export default function Home() {
    const [selectedDate, setSelectedDate] = useState<Date>(getTodayWithoutTime)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    if (isPlaying)
        return (
            <div className="not-motion-reduce:animate-slidefrombottom">
                <GameScreen date={selectedDate} />
            </div>
        )

    return (
        <GameSelectScreen
            handlePlay={(selectedDate) => {
                // TODO: navigate to dynamic route for the appropriate date
                setSelectedDate(selectedDate)
                setIsPlaying(true)
            }}
        />
    )
}
