'use client'

import Arrow from '@/svg/Arrow'
import clsx from 'clsx'
import { dateOnlyString } from 'lib/util'

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
    const isNextDateValid = max ? current < max : true
    const isPrevDateValid = min ? current > min : true
    return (
        <div className="flex flex-row items-center gap-1 rounded-lg p-2 backdrop-blur-xl">
            <Arrow
                className={clsx(
                    'fill-foreground hover:fill-gold size-6 rotate-180',
                    {
                        'fill-gray-600 hover:fill-gray-600': !isPrevDateValid
                    }
                )}
                onClick={() => {
                    if (!isPrevDateValid) return
                    else handlePrev()
                }}
            />
            <div className="text-foreground text-md w-30 text-center">
                {dateOnlyString(current)}
            </div>
            <Arrow
                className={clsx('fill-foreground hover:fill-gold size-6', {
                    'fill-gray-600 hover:fill-gray-600': !isNextDateValid
                })}
                onClick={() => {
                    if (!isNextDateValid) return
                    else handleNext()
                }}
            />
        </div>
    )
}
