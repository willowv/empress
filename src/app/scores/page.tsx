import Fortune from '@/svg/tarot/Fortune'
import QueryParamDateSelector from '@/ui/QueryParamDateSelector'
import SwipeNavigation from '@/ui/SwipeNavigation'
import {
    dateOnlyString,
    getDateWithoutTime,
    getTodayWithoutTime
} from 'lib/util'
import { Suspense } from 'react'
import Scores from './Scores'

export default async function Page(props: {
    searchParams?: Promise<{
        date?: string
    }>
}) {
    const searchParams = await props.searchParams
    let currentDateString = searchParams?.date || ''
    const iSODateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!currentDateString || !iSODateRegex.test(currentDateString))
        currentDateString = dateOnlyString(getTodayWithoutTime())

    const currentDate = getDateWithoutTime(new Date(currentDateString))
    return (
        <div className="not-motion-reduce:animate-slidefromtop relative h-screen select-none">
            <div className="fill-gold bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SwipeNavigation>
                    <Fortune />
                </SwipeNavigation>
            </div>
            <div className="absolute top-20 left-1/2 w-90 -translate-x-1/2 justify-items-center">
                <QueryParamDateSelector max={getTodayWithoutTime()} />
                <Suspense>
                    <Scores date={currentDate} />
                </Suspense>
            </div>
        </div>
    )
}
