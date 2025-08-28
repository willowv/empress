import GameScreen from '@/screens/GameScreen'
import { getTodayWithoutTime } from 'lib/util'
import { notFound } from 'next/navigation'

export default async function Page({
    params
}: {
    params: Promise<{ date: string }>
}) {
    const { date } = await params
    const iSODateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!iSODateRegex.test(date)) notFound()

    const parsedDate = new Date(date)
    if (parsedDate > getTodayWithoutTime()) notFound()

    const oneYearAgo = getTodayWithoutTime()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    if (parsedDate < oneYearAgo) notFound()

    return (
        <div className="not-motion-reduce:animate-slidefrombottom">
            <GameScreen date={parsedDate} />
        </div>
    )
}
