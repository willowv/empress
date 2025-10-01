import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import GameScreen from './GameScreen'

const meta = {
    component: GameScreen
} satisfies Meta<typeof GameScreen>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        date: new Date(1755241200000)
    }
}
