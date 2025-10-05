'use client'

import Arrow from '@/svg/Arrow'
import clsx from 'clsx'
import { getISODateOnlyString } from 'lib/util'
import React, { useLayoutEffect, useState } from 'react'
import { animated, useTransition, useReducedMotion } from '@react-spring/web'

interface DateSelectorProps {
    readonly current: Date
    readonly min?: Date
    readonly max?: Date
    readonly handleNext: () => void
    readonly handlePrev: () => void
}

export default function DateSelector({
    current,
    min,
    max,
    handleNext,
    handlePrev
}: DateSelectorProps) {
    useReducedMotion()
    const [lastDate, setLastDate] = useState<Date>(current)
    const [transitions, springApi] = useTransition(current, () => ({
        initial: { opacity: 1, x: 0 },
        from: () => ({ opacity: 0, x: current < lastDate ? -50 : 50 }),
        enter: { opacity: 1, x: 0 },
        leave: () => ({ opacity: 0, x: current < lastDate ? 50 : -50 }),
        exitBeforeEnter: true,
        config: { duration: 150 }
    }))
    useLayoutEffect(() => {
        springApi.start()
    }, [current])

    const isNextDateValid = max ? current < max : true
    const isPrevDateValid = min ? current > min : true
    return (
        <div
            id="date-selector"
            className="flex flex-row items-center gap-1 rounded-lg p-2 backdrop-blur-xl"
        >
            <Arrow
                className={clsx(
                    'fill-foreground hover:fill-gold size-6 rotate-180',
                    {
                        'fill-gray hover:fill-gray': !isPrevDateValid
                    }
                )}
                onClick={() => {
                    if (!isPrevDateValid) return
                    else {
                        setLastDate(current)
                        handlePrev()
                    }
                }}
            />
            {
                /*  This allows the transitions we set up above to run on changes to the current date.
                    Using 'item' here allows the old value and the new value to exist at the same time
                    for animation purposes. */
                transitions((springs, item) => (
                    <animated.div
                        className={
                            'text-foreground w-30 text-center text-base sm:w-40 sm:text-xl'
                        }
                        style={springs}
                    >
                        {getISODateOnlyString(item)}
                    </animated.div>
                ))
            }
            <Arrow
                className={clsx('fill-foreground hover:fill-gold size-6', {
                    'fill-gray hover:fill-gray': !isNextDateValid
                })}
                onClick={() => {
                    if (!isNextDateValid) return
                    else {
                        setLastDate(current)
                        handleNext()
                    }
                }}
            />
        </div>
    )
}
