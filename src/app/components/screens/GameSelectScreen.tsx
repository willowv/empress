'use client'

import { useState } from 'react'
import { dateOnlyString, getTodayWithoutTime } from 'lib/util'
import Chariot from '@/svg/tarot/Chariot'
import Button from '@/ui/Button'
import SwipeNavigation from '@/ui/SwipeNavigation'

interface GameSelectScreenProps {
    handlePlay: (selectedDate: Date) => void
}

export default function GameSelectScreen({
    handlePlay
}: GameSelectScreenProps) {
    const [selectedDate] = useState<Date>(getTodayWithoutTime)
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SwipeNavigation>
                    <Chariot />
                </SwipeNavigation>
            </div>
            <div className="absolute top-1/2 left-1/2 w-30 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col gap-2">
                    <div className="text-foreground text-md m-2 rounded-lg p-2 text-center backdrop-blur-xl">
                        {dateOnlyString(selectedDate)}
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
