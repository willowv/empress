'use client'

import Arrow from '@/svg/Arrow'
import clsx from 'clsx'
import { dateOnlyString } from 'lib/util'
import React, { useLayoutEffect, useState } from 'react'
import { animated, useTransition, useReducedMotion } from '@react-spring/web'

interface DateSelectorProps {
    readonly current: Date
    readonly min?: Date
    readonly max?: Date
    readonly handleNext: () => void
    readonly handlePrev: () => void
}

type Direction = 'left' | 'right'

export default function DateSelector({
    current,
    min,
    max,
    handleNext,
    handlePrev
}: DateSelectorProps) {
    useReducedMotion()
    const [direction, setDirection] = useState<Direction | undefined>(undefined)
    const [transitions, springApi] = useTransition(current, () => ({
        initial: { opacity: 1, x: 0 },
        from: () => ({ opacity: 0, x: direction === 'left' ? -50 : 50 }),
        enter: { opacity: 1, x: 0 },
        leave: () => ({ opacity: 0, x: direction === 'left' ? 50 : -50 }),
        exitBeforeEnter: true,
        config: { duration: 200 }
    }))
    useLayoutEffect(() => {
        springApi.start()
    }, [current])

    const isNextDateValid = max ? current < max : true
    const isPrevDateValid = min ? current > min : true
    // const dateString = dateOnlyString(current)
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
                        setDirection('left')
                        handlePrev()
                    }
                }}
            />
            {transitions((springs, item) => (
                <animated.div
                    className={'text-foreground text-md w-30 text-center'}
                    style={springs}
                >
                    {dateOnlyString(item)}
                </animated.div>
            ))}
            <Arrow
                className={clsx('fill-foreground hover:fill-gold size-6', {
                    'fill-gray hover:fill-gray': !isNextDateValid
                })}
                onClick={() => {
                    if (!isNextDateValid) return
                    else {
                        setDirection('right')
                        handleNext()
                    }
                }}
            />
        </div>
    )
}
