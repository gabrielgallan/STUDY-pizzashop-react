import { api } from '@/lib/ky'

interface RegisterRestaurantBody {
	restaurantName: string
	managerName: string
	email: string
	phone: string
}

export async function registerRestaurant({
	restaurantName,
	managerName,
	email,
	phone,
}: RegisterRestaurantBody) {
	await api.post('/restaurants', {
		json: {
			restaurantName,
			managerName,
			email,
			phone,
		},
	})
}
