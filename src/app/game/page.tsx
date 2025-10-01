'use client'

import GameScreen from './GameScreen'
import { addYears, ensureValidDate, getTodayWithoutTime } from 'lib/util'
import { notFound, useSearchParams } from 'next/navigation'

export default function Page() {
    const dateString = useSearchParams().get('date') ?? undefined
    const date = ensureValidDate(dateString, getTodayWithoutTime())
    const oneYearAgo = addYears(getTodayWithoutTime(), -1)
    if (date < oneYearAgo) notFound()

    return <GameScreen date={date} />
}
