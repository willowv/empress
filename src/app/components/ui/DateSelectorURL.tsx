'use client'

import Arrow from '@/svg/Arrow'
import clsx from 'clsx'
import {
    addDays,
    dateOnlyString,
    getDateWithoutTime,
    getTodayWithoutTime
} from 'lib/util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface DateSelectorURLProps {
    readonly min?: Date
    readonly max?: Date
}

export default function DateSelectorURL({ min, max }: DateSelectorURLProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    let currentDateString = searchParams.get('date')?.toString()

    const iSODateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!currentDateString || !iSODateRegex.test(currentDateString))
        currentDateString = dateOnlyString(getTodayWithoutTime())

    const currentDate = getDateWithoutTime(new Date(currentDateString))

    function handleNewDate(date: Date) {
        const params = new URLSearchParams(searchParams)
        params.set('date', dateOnlyString(date))
        router.replace(`${pathname}?${params.toString()}`)
    }

    const isNextDateValid = max ? currentDate < max : true
    const isPrevDateValid = min ? currentDate > min : true
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
                    else handleNewDate(addDays(currentDate, -1))
                }}
            />
            <div className="text-foreground text-md w-30 text-center">
                {dateOnlyString(currentDate)}
            </div>
            <Arrow
                className={clsx('fill-foreground hover:fill-gold size-6', {
                    'fill-gray-600 hover:fill-gray-600': !isNextDateValid
                })}
                onClick={() => {
                    if (!isNextDateValid) return
                    else handleNewDate(addDays(currentDate, 1))
                }}
            />
        </div>
    )
}
