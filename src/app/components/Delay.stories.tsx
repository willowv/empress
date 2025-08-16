import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Delay from './Delay'
import * as Example from '@/game/example'

const meta = {
    component: Delay
} satisfies Meta<typeof Delay>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
    args: {
        selectedAgentId: null,
        agents: Example.stateInitial.agents,
        setSelectedAgentId: () => {},
        handleLocationClick: () => {},
        handleAgentClick: () => {},
        lockedAgentIds: []
    }
}

export const Midgame: Story = {
    args: {
        selectedAgentId: null,
        agents: Example.stateAfterTurn2.agents,
        setSelectedAgentId: () => {},
        handleLocationClick: () => {},
        handleAgentClick: () => {},
        lockedAgentIds: [4]
    }
}
