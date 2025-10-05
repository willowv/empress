'use client'

import {
    addDays,
    getUTCISOString,
    ensureValidDate,
    getDateWithoutTime
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
    const currentDateString = searchParams.get('date')?.toString()
    const currentDate = ensureValidDate(
        currentDateString,
        getDateWithoutTime(new Date())
    )

    function handleNewDate(date: Date) {
        const params = new URLSearchParams(searchParams)
        params.set('date', getUTCISOString(date))
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
