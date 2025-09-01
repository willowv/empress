import 'tailwindcss'
import Person from '@/svg/Person'
import clsx from 'clsx'

type NumberBoxState = 'default' | 'invalid' | 'accepted'

interface NumberBoxProps {
    readonly num?: number
    readonly state?: NumberBoxState
}

export default function NumberBox({ num, state = 'default' }: NumberBoxProps) {
    return (
        <div
            className={clsx(
                'border-foreground relative size-12 rounded-lg border-1 select-none',
                {
                    'border-green': state === 'accepted',
                    'border-red': state === 'invalid',
                    'border-dashed': num == undefined
                }
            )}
        >
            {num != undefined ? (
                <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                    {num}
                </div>
            ) : (
                <div className="fill-foreground absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 opacity-15">
                    <Person />
                </div>
            )}
        </div>
    )
}
