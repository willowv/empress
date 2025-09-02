import 'tailwindcss'
import Person from '@/svg/Person'
import clsx from 'clsx'

type AssignTargetState = 'default' | 'invalid' | 'valid'

interface AssignTargetProps {
    readonly state?: AssignTargetState
    readonly onClick?: () => void
}

export default function AssignTarget({
    state = 'default',
    onClick = () => {}
}: AssignTargetProps) {
    return (
        <div
            onClick={(e) => {
                onClick()
                e.stopPropagation()
            }}
            className={clsx(
                'border-foreground relative size-12 rounded-lg border-1 border-dashed select-none',
                {
                    'border-green': state === 'valid',
                    'border-red': state === 'invalid'
                }
            )}
        >
            <div className="fill-foreground absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 opacity-15">
                <Person />
            </div>
        </div>
    )
}
