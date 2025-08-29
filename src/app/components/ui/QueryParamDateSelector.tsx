'use client'

import {
    addDays,
    dateOnlyString,
    getDateWithoutTime,
    getTodayWithoutTime
} from 'lib/util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import DateSelector from './DateSelector'

interface QueryParamDateSelector {
    readonly min?: Date
    readonly max?: Date
}

export default function QueryParamDateSelector({
    min,
    max
}: QueryParamDateSelector) {
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

    return (
        <DateSelector
            current={currentDate}
            handleNext={() => handleNewDate(addDays(currentDate, 1))}
            handlePrev={() => handleNewDate(addDays(currentDate, -1))}
            min={min}
            max={max}
        />
    )
}
