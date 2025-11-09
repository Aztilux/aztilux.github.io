// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://aztilux.github.io',
    base: '/personal2',
    vite: {
        plugins: [tailwindcss()]
    }
});