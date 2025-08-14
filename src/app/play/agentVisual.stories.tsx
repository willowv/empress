import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AgentVisual } from './agentVisual'

const meta = {
    component: AgentVisual
} satisfies Meta<typeof AgentVisual>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        id: 0,
        maxValue: 0,
        curValue: 0,
        location: 'Court'
    }
}
