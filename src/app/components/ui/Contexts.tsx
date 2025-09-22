import { createContext } from 'react'

interface AnimationContextProps {
    readonly lastEndTurnAt: Date | undefined
}

export const AnimationContext = createContext<AnimationContextProps>({
    lastEndTurnAt: new Date(0)
})

interface NavigationContextProps {
    readonly lastPage: string | undefined
}

export const NavigationContext = createContext<NavigationContextProps>({
    lastPage: undefined
})
