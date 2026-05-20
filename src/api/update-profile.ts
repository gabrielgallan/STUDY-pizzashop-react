import { api } from '@/lib/ky'

interface UpdateProfileBody {
	name: string
	description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
	await api.put('/profile', {
		json: { name, description },
	})
}
