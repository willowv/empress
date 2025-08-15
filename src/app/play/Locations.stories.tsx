import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Locations } from './Locations'
import {
    testEndGameState,
    testInitialState,
    testMidGameState,
    testMidGameState2
} from '@/game/exampleObjects'

const meta = {
    component: Locations
} satisfies Meta<typeof Locations>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
    args: {
        state: testInitialState,
        handleLocationClick: () => {},
        lockedAgentIds: []
    }
}

export const Midgame: Story = {
    args: {
        state: testMidGameState,
        handleLocationClick: () => {},
        lockedAgentIds: []
    }
}

export const Midgame2: Story = {
    args: {
        state: testMidGameState2,
        handleLocationClick: () => {},
        lockedAgentIds: []
    }
}

export const Endgame: Story = {
    args: {
        state: testEndGameState,
        handleLocationClick: () => {},
        lockedAgentIds: []
    }
}
