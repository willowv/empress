import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Delay from './Delay'

const meta = {
    component: Delay
} satisfies Meta<typeof Delay>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
    args: {
        prevAgent: null,
        nextAgent: null,
        selectedAgentId: null,
        handleLocationClick: () => {},
        handleAgentClick: () => {}
    }
}

export const Midgame: Story = {
    args: {
        prevAgent: {
            id: 0,
            curValue: 1,
            maxValue: 4,
            location: 'Delay'
        },
        nextAgent: {
            id: 1,
            curValue: 2,
            maxValue: 4,
            location: 'Delay'
        },
        selectedAgentId: null,
        handleLocationClick: () => {},
        handleAgentClick: () => {}
    }
}
