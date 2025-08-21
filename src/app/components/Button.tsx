import 'tailwindcss'

interface ButtonProps {
    readonly text: string
    readonly isDisabled: boolean
    readonly handleButtonPress: () => void
}

export default function Button({
    text,
    isDisabled,
    handleButtonPress
}: ButtonProps) {
    return (
        <button
            className="text-foreground flex h-8 items-center justify-center rounded-xl border-2 border-amber-400 px-4 text-sm font-medium transition-colors hover:text-amber-400 disabled:border-gray-600 disabled:text-gray-600"
            disabled={isDisabled}
            onClick={handleButtonPress}
        >
            {text}
        </button>
    )
}
