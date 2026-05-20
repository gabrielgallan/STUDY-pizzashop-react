import ky from 'ky'
import { env } from '@/env'

export const api = ky.create({
	baseUrl: env.VITE_API_URL,
	credentials: 'include',

	hooks: {
		beforeRequest: [
			async () => {
				await new Promise((resolve) => setTimeout(resolve, 2000))
			},
		],
	},
})
