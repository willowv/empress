import 'tailwindcss'

interface NumberBoxProps {
    readonly num: number
}

export default function NumberBox({ num }: NumberBoxProps) {
    return (
        <div className="border-foreground relative size-12 rounded-lg border-1 select-none">
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                {num}
            </div>
        </div>
    )
}
