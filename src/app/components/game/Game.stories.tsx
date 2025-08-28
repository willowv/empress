import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import Game from './Game'

const meta = {
    component: Game
} satisfies Meta<typeof Game>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        date: new Date(1755241200000)
    }
}
