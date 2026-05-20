import { api } from '@/lib/ky'

interface SignInBody {
	email: string
}

export async function signIn({ email }: SignInBody) {
	await api.post('/authenticate', {
		json: { email },
	})
}
