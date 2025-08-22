import 'tailwindcss'
import Person from './svg/Person'

type NumberBoxState = 'default' | 'invalid' | 'accepted'

interface NumberBoxProps {
    readonly num?: number
    readonly state?: NumberBoxState
}

export default function NumberBox({ num, state = 'default' }: NumberBoxProps) {
    const mapState_css = {
        default: 'border-foreground',
        accepted: 'border-green',
        invalid: 'border-red'
    }
    const content =
        num != undefined ? (
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                {num}
            </div>
        ) : (
            <div className="fill-foreground absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 opacity-15">
                <Person />
            </div>
        )
    return (
        <div
            className={
                'relative size-12 border-1 select-none ' + mapState_css[state]
            }
        >
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                {content}
            </div>
        </div>
    )
}
