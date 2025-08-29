'use client'

import { useState } from 'react'
import { addDays, addYears, getTodayWithoutTime } from 'lib/util'
import Chariot from '@/svg/tarot/Chariot'
import Button from '@/ui/Button'
import SwipeNavigation from '@/ui/SwipeNavigation'
import DateSelector from '@/ui/DateSelector'

interface GameSelectScreenProps {
    handlePlay: (selectedDate: Date) => void
}

export default function GameSelectScreen({
    handlePlay
}: GameSelectScreenProps) {
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
                    <Button
                        isDisabled={false}
                        handleButtonPress={() => handlePlay(selectedDate)}
                    >
                        {'Play'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
