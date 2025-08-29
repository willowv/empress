import _ from 'lodash'

export function getTodayWithoutTime(): Date {
    return getDateWithoutTime(new Date())
}

export function dateOnlyString(date: Date) {
    return date.toISOString().split('T')[0]
}

export const pages: string[] = ['/', '/play', '/scores']

export function nextPage(page: string): string {
    return pages[(pages.indexOf(page) + 1) % pages.length]
}

export function prevPage(page: string): string {
    const prevIndex = pages.indexOf(page) - 1
    return pages[prevIndex < 0 ? pages.length - 1 : prevIndex]
}

export function getPageName(href: string) {
    switch (href) {
        case '/':
            return 'Main'
        case '/play':
            return 'Play'
        case '/scores':
            return 'Scores'
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
