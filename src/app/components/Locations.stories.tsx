import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Locations from './Locations'
import * as Example from '@/game/example'

const meta = {
    component: Locations
} satisfies Meta<typeof Locations>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
    args: {
        state: Example.stateInitial,
        handleNewMove: () => {},
        lockedAgentIds: []
    }
}

export const Midgame: Story = {
    args: {
        state: Example.stateAfterTurn1,
        handleNewMove: () => {},
        lockedAgentIds: []
    }
}

export const Midgame2: Story = {
    args: {
        state: Example.stateAfterTurn2,
        handleNewMove: () => {},
        lockedAgentIds: []
    }
}

export const Endgame: Story = {
    args: {
        state: Example.stateEnded,
        handleNewMove: () => {},
        lockedAgentIds: []
    }
}
