import { addYears, ensureValidDate, getDateWithoutTime } from 'lib/util'
import { notFound } from 'next/navigation'
import GameScreen from './GameScreen'

export default async function Page(props: {
    searchParams?: Promise<{
        date?: string
    }>
}) {
    const searchParams = await props.searchParams
    const dateString = searchParams?.date
    const date = ensureValidDate(dateString, getDateWithoutTime(new Date()))
    const oneYearAgo = addYears(getDateWithoutTime(new Date()), -1)
    if (date < oneYearAgo) notFound()
    return <GameScreen date={date} />
}
