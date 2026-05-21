import { api } from '@/lib/ky'

export interface GetManagedRestaurantResponse {
	id: string
	managerId: string | null
	name: string
	description: string | null
	createdAt: Date | null
	updatedAt: Date | null
}

export async function getManagedRestaurant() {
	const response = await api.get<GetManagedRestaurantResponse>('/managed-restaurant').json()

	return response
}
