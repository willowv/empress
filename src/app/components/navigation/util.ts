export type Direction = 'left' | 'right' | 'top' | 'none'

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
