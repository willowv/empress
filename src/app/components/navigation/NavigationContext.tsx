import { createContext } from 'react'

interface NavigationContextProps {
    readonly lastPage: string | undefined
}

export const NavigationContext = createContext<NavigationContextProps>({
    lastPage: undefined
})
