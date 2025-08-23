import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { action } from 'storybook/actions'

import Intro from './Intro'

const meta = {
    component: Intro
} satisfies Meta<typeof Intro>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        handleIntroTap: action('swipe')
    }
}
