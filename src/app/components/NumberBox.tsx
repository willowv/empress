import 'tailwindcss'

type NumberBoxState = 'default' | 'invalid' | 'accepted'

interface NumberBoxProps {
    readonly num: number | undefined
    readonly state?: NumberBoxState
}

export default function NumberBox({ num, state = 'default' }: NumberBoxProps) {
    const mapState_css = {
        default: 'border-foreground',
        accepted: 'border-green',
        invalid: 'border-red'
    }
    return (
        <div
            className={
                'relative size-12 border-1 select-none ' + mapState_css[state]
            }
        >
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold backdrop-blur-xs">
                {num}
            </div>
        </div>
    )
}
