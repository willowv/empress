import { Tour } from 'nextstepjs'

const ONBOARDING_STEPS: Tour[] = [
    {
        tour: 'game-tutorial',
        steps: [
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div className="flex flex-col gap-2">
                        <div>
                            The goal of this game is to get the highest score
                            you can before the Empress returns from her trip
                            abroad.
                        </div>
                        <div>
                            This is the Court; your agents wait here to be
                            assigned to other duties. At the start of each turn,
                            all agents here are rerolled.
                        </div>
                    </div>
                ),
                selector: '#location-court',
                side: 'bottom',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div className="flex flex-col gap-2">
                        Click or tap on an agent to select them.
                    </div>
                ),
                selector: '#agent-0',
                side: 'bottom-left',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div className="flex flex-col gap-2">
                        <div>
                            This is where your agents can Influence the Council,
                            which is how you earn points.
                        </div>
                        <div>
                            You can assign multiple agents to this location per
                            turn, but will need to provide a suitable Bribe to
                            cover for them later.
                        </div>
                    </div>
                ),
                selector: '#location-influence',
                side: 'bottom',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div>
                        Click or tap on a location to assign the selected agent
                        there. You can also drag an agent directly to where
                        you&apos;d like to assign them.
                    </div>
                ),
                selector: '#assign-target',
                side: 'top-left',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div className="flex flex-col gap-2">
                        <div>
                            The Empress could return at any moment, putting an
                            end to your political ambitions. Assign agents to
                            delay her.
                        </div>
                        <div>
                            Each turn you will need to assign an agent showing a
                            higher number than the one you used the previous
                            turn, so don&apos;t go too high too fast!
                        </div>
                        <div>
                            If you cannot beat the previous number, ending your
                            turn will end the game.
                        </div>
                    </div>
                ),
                selector: '#location-delay',
                side: 'top-left',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div className="flex flex-col gap-2">
                        <div>
                            In order for your agents to act freely throughout
                            the capital, you&apos;ll need to Bribe the officials
                            appropriately.
                        </div>
                        <div>
                            Every agent that you assign to Influence the council
                            or Delay the Empress will increase the size of the
                            Bribe needed. Assign an agent of appropriate value
                            to pay these bribes.
                        </div>
                        <div>
                            If you cannot afford the bribe, you will need to
                            recall some of your agents to end your turn.
                        </div>
                    </div>
                ),
                selector: '#location-bribe',
                side: 'top-right',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div>
                        To quickly undo all of the assignments you&apos;ve made
                        this turn, press the &quot;Reset Turn&quot; button.
                    </div>
                ),
                selector: '#button-reset-turn',
                side: 'top-left',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            },
            {
                icon: null,
                title: 'How to Play',
                content: (
                    <div>
                        When you are happy with your assignments, press this
                        button to end your turn. If you have not successfully
                        delayed the Empress, this will end the game.
                    </div>
                ),
                selector: '#button-end-turn',
                side: 'top-right',
                pointerRadius: 5,
                pointerPadding: 5,
                viewportID: 'scrollable-viewport'
            }
        ]
    }
]

export default ONBOARDING_STEPS
