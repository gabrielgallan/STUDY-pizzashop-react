import ky from 'ky'
import { env } from '@/env'

export const api = ky.create({
	baseUrl: env.VITE_API_URL,
	credentials: 'include',

	hooks: {
		beforeRequest: [
			// async () => {
			// 	await new Promise((resolve) => setTimeout(resolve, 5000))
			// },
		],
		afterResponse: [
			async ({ response }) => {
				const status = response.status

				if (status !== 401) {
					return
				}

				const { code } = await response.json<{ code?: string }>()

				if (code === 'UNAUTHORIZED') {
					window.location.href = '/sign-in'
				}
			},
		],
	},
})
