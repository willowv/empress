export function getTodayWithoutTime(): Date {
    const todayWithTime: Date = new Date()
    const day: number = todayWithTime.getUTCDate()
    const month: number = todayWithTime.getUTCMonth()
    const year: number = todayWithTime.getUTCFullYear()
    return new Date(year, month, day)
}

export const pages: string[] = ['/', '/play', '/scores']

export function nextPage(page: string): string {
    return pages[(pages.indexOf(page) + 1) % pages.length]
}

export function prevPage(page: string): string {
    const prevIndex = pages.indexOf(page) - 1
    return pages[prevIndex < 0 ? pages.length - 1 : prevIndex]
}
