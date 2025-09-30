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
            <div className="text-foreground text-shadow-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-shadow-md/100 sm:text-xl">
                {dieSize}
            </div>
        </div>
    )
}
