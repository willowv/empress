import _ from 'lodash'

export function getISODateOnlyString(date: Date) {
    return date.toISOString().split('T')[0]
}

export function addDays(date: Date, n: number): Date {
    const newDate = _.cloneDeep(date)
    newDate.setUTCDate(newDate.getUTCDate() + n)
    return newDate
}

export function addYears(date: Date, n: number): Date {
    const newDate = _.cloneDeep(date)
    newDate.setUTCFullYear(newDate.getUTCFullYear() + n)
    return newDate
}

export function getDateWithoutTime(date: Date): Date {
    const newDate = _.cloneDeep(date)
    newDate.setUTCHours(0, 0, 0, 0)
    return newDate
}

export function withTimeOf(thisDate: Date, timeSource: Date): Date {
    const newDate = _.cloneDeep(thisDate)
    newDate.setUTCHours(
        timeSource.getUTCHours(),
        timeSource.getUTCMinutes(),
        timeSource.getUTCSeconds(),
        timeSource.getUTCMilliseconds()
    )
    return newDate
}

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export function ensureValidDate(
    dateString: string | undefined,
    fallbackDate: Date
): Date {
    if (!dateString || !ISO_DATE_REGEX.test(dateString)) return fallbackDate

    return getDateWithoutTime(new Date(dateString)) // Given a date string in ISO format with no time, Date.parse() assumes UTC
}
