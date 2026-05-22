import { api } from '@/lib/ky'

interface Product {
	product: string
	amount: number
}

type GetPopularProductsResponse = Product[]

export async function getPopularProducts() {
	const response = await api.get<GetPopularProductsResponse>('/metrics/popular-products').json()

	return response
}
