import 'tailwindcss'
import Die from '@/svg/Die'
import { DieSize } from '@/logic/empress'

interface AgentPreviewProps {
    readonly dieSize: DieSize
}

export default function AgentPreview({ dieSize }: AgentPreviewProps) {
    return (
        <div className="fill-foreground transition-color relative size-12 select-none sm:size-14">
            <div>
                <Die dieSize={dieSize} />
            </div>
            <div className="bg-background absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-4xl opacity-30 sm:size-6" />
            <div className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold sm:text-xl">
                {dieSize}
            </div>
        </div>
    )
}
