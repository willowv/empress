import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Bribe from './Bribe'
import * as Example from '@/game/example'

const meta = {
    component: Bribe
} satisfies Meta<typeof Bribe>

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
        lockedAgentIds: [3]
    }
}
