'use client'

import { useState } from 'react'
import {
    addDays,
    addYears,
    dateOnlyString,
    getTodayWithoutTime
} from 'lib/util'
import Chariot from '@/svg/tarot/Chariot'
import SwipeNavigation from '@/ui/SwipeNavigation'
import DateSelector from '@/ui/DateSelector'
import ButtonLink from '@/ui/ButtonLink'

export default function GameSelectScreen() {
    const [selectedDate, setSelectedDate] = useState<Date>(getTodayWithoutTime)
    const oneYearAgo = addYears(getTodayWithoutTime(), -1)
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SwipeNavigation>
                    <Chariot />
                </SwipeNavigation>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-2">
                    <DateSelector
                        current={selectedDate}
                        max={getTodayWithoutTime()}
                        min={oneYearAgo}
                        handlePrev={() =>
                            setSelectedDate(addDays(selectedDate, -1))
                        }
                        handleNext={() => {
                            setSelectedDate(addDays(selectedDate, 1))
                        }}
                    />
                    <ButtonLink href={`/play/${dateOnlyString(selectedDate)}`}>
                        {'Play'}
                    </ButtonLink>
                </div>
            </div>
        </div>
    )
}
