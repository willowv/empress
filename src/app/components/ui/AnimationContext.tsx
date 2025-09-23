import { createContext } from 'react'

interface AnimationContextProps {
    readonly lastEndTurnAt: Date | undefined
}

export const AnimationContext = createContext<AnimationContextProps>({
    lastEndTurnAt: new Date(0)
})
