import _ from 'lodash'

export function getTodayWithoutTime(): Date {
    return getDateWithoutTime(new Date())
}

export function dateOnlyString(date: Date) {
    return date.toISOString().split('T')[0]
}

export function addDays(date: Date, n: number): Date {
    const newDate = _.cloneDeep(date)
    newDate.setDate(newDate.getDate() + n)
    return newDate
}

export function addYears(date: Date, n: number): Date {
    const newDate = _.cloneDeep(date)
    newDate.setFullYear(newDate.getFullYear() + n)
    return newDate
}

export function getDateWithoutTime(date: Date): Date {
    const day: number = date.getUTCDate()
    const month: number = date.getUTCMonth()
    const year: number = date.getUTCFullYear()
    return new Date(year, month, day)
}

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export function ensureValidDate(
    dateString: string | undefined,
    fallbackDate: Date
): Date {
    if (!dateString || !ISO_DATE_REGEX.test(dateString)) return fallbackDate

    return getDateWithoutTime(new Date(dateString))
}
