import { ReactNode } from 'react'
import 'tailwindcss'

interface ButtonProps {
    readonly children: ReactNode
    readonly isDisabled: boolean
    readonly handleButtonPress: () => void
}

export default function Button({
    children,
    isDisabled,
    handleButtonPress
}: ButtonProps) {
    return (
        <button
            className="text-foreground border-gold hover:text-gold flex h-8 items-center justify-center rounded-xl border-2 px-4 text-sm font-medium transition-colors disabled:border-gray-600 disabled:text-gray-600"
            disabled={isDisabled}
            onClick={handleButtonPress}
        >
            {children}
        </button>
    )
}
