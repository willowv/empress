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
import { DieSize, getCurrentState } from '@/logic/empress'
import Agent from '@/game/Agent'

export default function GameSelectScreen() {
    const [selectedDate, setSelectedDate] = useState<Date>(getTodayWithoutTime)
    const oneYearAgo = addYears(getTodayWithoutTime(), -1)
    const statePreview = getCurrentState({
        date: selectedDate,
        seed: dateOnlyString(selectedDate),
        turnHistory: []
    })
    const mpDieSize_Count = new Map<DieSize, number>()
    statePreview.agents.forEach((agent) => {
        mpDieSize_Count.set(
            agent.maxValue,
            (mpDieSize_Count.get(agent.maxValue) ?? 0) + 1
        )
    })
    return (
        <div className="not-motion-reduce:animate-slidefromright relative flex flex-col items-center select-none">
            <div className="fill-gold bg-background max-h-screen">
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
                    <div className="text-foreground rounded-lg p-2 text-center text-sm backdrop-blur-xl">
                        {'Dice Preview'}
                    </div>
                    <div className="flex flex-row flex-wrap items-center justify-around gap-2 rounded-lg p-2 backdrop-blur-xl">
                        {mpDieSize_Count
                            .entries()
                            .map(([dieSize, count], index) => {
                                return (
                                    <div
                                        key={`preview-${index}`}
                                        className="flex flex-row items-center gap-1"
                                    >
                                        <div className="text-foreground text-md">{`${count} x`}</div>
                                        <Agent
                                            agent={{
                                                id: index,
                                                curValue: dieSize,
                                                maxValue: dieSize,
                                                location: 'Court'
                                            }}
                                            handleAgentClick={() => {}}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                    <ButtonLink href={`/play/${dateOnlyString(selectedDate)}`}>
                        {'Play'}
                    </ButtonLink>
                </div>
            </div>
        </div>
    )
}
