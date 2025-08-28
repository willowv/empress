'use client'

import _ from 'lodash'
import { useState } from 'react'
import { getTodayWithoutTime } from 'lib/util'
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
    const oneYearAgo = getTodayWithoutTime()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
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
                        handlePrev={() => {
                            const prevDate = _.cloneDeep(selectedDate)
                            prevDate.setDate(prevDate.getDate() - 1)
                            setSelectedDate(prevDate)
                        }}
                        handleNext={() => {
                            const nextDate = _.cloneDeep(selectedDate)
                            nextDate.setDate(nextDate.getDate() + 1)
                            setSelectedDate(nextDate)
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
