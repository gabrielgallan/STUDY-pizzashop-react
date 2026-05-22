import { api } from '@/lib/ky'
import type { OrderStatus } from './get-orders'

interface GetOrderDetailsRequest {
	orderId: string
}

interface Customer {
	name: string
	email: string
	phone: string | null
}

interface OrderItem {
	id: string
	priceInCents: number
	quantity: number
	product: {
		name: string
	}
}

interface GetOrderDetailsResponse {
	id: string
	createdAt: string
	status: OrderStatus
	totalInCents: number
	customer: Customer
	orderItems: OrderItem[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsRequest) {
	const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`).json()

	return response
}
