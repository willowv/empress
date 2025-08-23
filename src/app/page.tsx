'use client'

import { useState } from 'react'
import Game from './components/Game'
import Intro from './components/Intro'

type State = 'Intro' | 'Game' | 'Scores'

function getTodayWithoutTime(): Date {
    const todayWithTime: Date = new Date()
    const day: number = todayWithTime.getUTCDate()
    const month: number = todayWithTime.getUTCMonth()
    const year: number = todayWithTime.getUTCFullYear()
    return new Date(year, month, day)
}

export default function Home() {
    const [state, setState] = useState<State>('Intro')
    const [selectedDate, setSelectedDate] = useState<Date>(getTodayWithoutTime)

    switch (state) {
        case 'Intro':
            return <Intro handleEndOfIntro={() => setState('Game')} />
        case 'Game':
            return <Game date={selectedDate} />
        case 'Scores':
            return <></>
    }
}
