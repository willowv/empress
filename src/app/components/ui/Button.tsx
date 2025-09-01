import { ReactNode } from 'react'
import 'tailwindcss'

interface ButtonProps {
    readonly children: ReactNode
    readonly isDisabled?: boolean
    readonly handleButtonPress: () => void
}

export default function Button({
    children,
    isDisabled = false,
    handleButtonPress
}: ButtonProps) {
    return (
        <button
            className="text-foreground bg-background border-gold hover:text-gold disabled:border-gray disabled:text-gray flex h-8 min-w-26 items-center justify-center rounded-xl border-2 px-2 text-xs font-medium transition-colors"
            disabled={isDisabled}
            onClick={handleButtonPress}
        >
            {children}
        </button>
    )
}
