/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
		setupFiles: ['test/setup.ts'],
		environment: 'jsdom',
	},
})
