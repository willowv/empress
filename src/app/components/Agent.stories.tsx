import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Agent from './Agent'

const meta = {
    component: Agent
} satisfies Meta<typeof Agent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        agent: {
            id: 0,
            maxValue: 4,
            curValue: 1,
            location: 'Court'
        },
        isSelected: false,
        isLocked: false,
        setSelected: () => {}
    }
}

export const Selected: Story = {
    args: {
        agent: {
            id: 0,
            maxValue: 4,
            curValue: 1,
            location: 'Court'
        },
        isSelected: true,
        isLocked: false,
        setSelected: () => {}
    }
}
