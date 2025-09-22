import _ from 'lodash'

export type Direction = 'left' | 'right' | 'top' | 'none'

export function getTodayWithoutTime(): Date {
    return getDateWithoutTime(new Date())
}

export function dateOnlyString(date: Date) {
    return date.toISOString().split('T')[0]
}

export const pages: string[] = ['/', '/play', '/story']

export function nextPage(pathname: string): string | undefined {
    if (!pages.includes(pathname)) return undefined

    const pageIndex = pages.findLastIndex((page) => {
        return pathname.includes(page)
    })
    // Shouldn't be possible for this find to fail but the result would be root
    return pages[(pageIndex + 1) % pages.length]
}

export function prevPage(pathname: string): string | undefined {
    if (!pages.includes(pathname)) return undefined

    const pageIndex = pages.findLastIndex((page) => {
        return pathname.includes(page)
    })
    const prevIndex = pageIndex < 0 ? 0 : pageIndex - 1
    return pages[prevIndex < 0 ? pages.length - 1 : prevIndex]
}

export function navigationDirection(
    thisPage: string,
    lastPage: string | undefined
): Direction {
    if (thisPage === lastPage) return 'none'
    const nextPageHref = nextPage(thisPage)
    const prevPageHref = prevPage(thisPage)
    const navDirection =
        nextPageHref === lastPage
            ? 'left'
            : prevPageHref === lastPage
              ? 'right'
              : 'top'

    return navDirection
}

export function getPageName(href: string) {
    switch (href) {
        case '/':
            return 'Main'
        case '/play':
            return 'Play'
        case '/story':
            return 'Story'
    }
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
