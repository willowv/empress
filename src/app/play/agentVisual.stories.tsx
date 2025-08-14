import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AgentVisual } from './agentVisual'

const meta = {
    component: AgentVisual
} satisfies Meta<typeof AgentVisual>

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
        setSelected: () => {}
    }
}
