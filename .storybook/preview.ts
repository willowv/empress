import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo'
        },
        viewport: {
            options: INITIAL_VIEWPORTS
        },
        initialGlobals: {
            viewport: { value: 'iphone14', isRotated: false }
        }
    }
}

export default preview
