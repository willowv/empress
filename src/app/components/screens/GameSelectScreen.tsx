'use client'

import _ from 'lodash'
import { useState } from 'react'
import { dateOnlyString, getTodayWithoutTime } from 'lib/util'
import Chariot from '@/svg/tarot/Chariot'
import Button from '@/ui/Button'
import SwipeNavigation from '@/ui/SwipeNavigation'
import Arrow from '@/svg/Arrow'
import clsx from 'clsx'

interface GameSelectScreenProps {
    handlePlay: (selectedDate: Date) => void
}

export default function GameSelectScreen({
    handlePlay
}: GameSelectScreenProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(getTodayWithoutTime)
    const isNextDateTheFuture = selectedDate >= getTodayWithoutTime()
    const oneYearAgo = _.cloneDeep(getTodayWithoutTime())
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const isPrevDateTooFarBack = selectedDate <= oneYearAgo
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SwipeNavigation>
                    <Chariot />
                </SwipeNavigation>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-1 rounded-lg p-2 backdrop-blur-xl">
                        <Arrow
                            className={clsx(
                                'fill-foreground hover:fill-gold size-6 rotate-180',
                                {
                                    'fill-gray-600 hover:fill-gray-600':
                                        isPrevDateTooFarBack
                                }
                            )}
                            onClick={() => {
                                if (isPrevDateTooFarBack) return

                                const prevDate = _.cloneDeep(selectedDate)
                                prevDate.setDate(prevDate.getDate() - 1)
                                setSelectedDate(prevDate)
                            }}
                        />
                        <div className="text-foreground text-md w-30 text-center">
                            {dateOnlyString(selectedDate)}
                        </div>
                        <Arrow
                            className={clsx(
                                'fill-foreground hover:fill-gold size-6',
                                {
                                    'fill-gray-600 hover:fill-gray-600':
                                        isNextDateTheFuture
                                }
                            )}
                            onClick={() => {
                                if (isNextDateTheFuture) return

                                const nextDate = _.cloneDeep(selectedDate)
                                nextDate.setDate(nextDate.getDate() + 1)
                                setSelectedDate(nextDate)
                            }}
                        />
                    </div>
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
