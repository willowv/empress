import GameScreen from '@/screens/GameScreen'
import { addYears, ensureValidDate, getTodayWithoutTime } from 'lib/util'
import { notFound } from 'next/navigation'

export default async function Page({
    params
}: {
    params: Promise<{ date: string }>
}) {
    const { date: dateString } = await params
    const date = ensureValidDate(dateString, getTodayWithoutTime())
    const oneYearAgo = addYears(getTodayWithoutTime(), -1)
    if (date < oneYearAgo) notFound()

    return (
        <div className="not-motion-reduce:animate-slidefrombottom">
            <GameScreen date={date} />
        </div>
    )
}
