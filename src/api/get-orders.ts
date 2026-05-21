import { api } from '@/lib/ky'

export type OrderStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

export interface Order {
	orderId: string
	createdAt: Date
	status: OrderStatus
	customerName: string
	total: number
}

interface GetOrdersRequest {
	pageIndex: number
	orderId?: string
	customerName?: string
	status?: string
}

export interface GetOrdersResponse {
	orders: Order[]
	meta: {
		pageIndex: number
		perPage: number
		totalCount: number
	}
}

export async function getOrders({ pageIndex, orderId, customerName, status }: GetOrdersRequest) {
	const response = await api
		.get<GetOrdersResponse>('/orders', {
			searchParams: {
				pageIndex,
				orderId: orderId,
				customerName,
				status,
			},
		})
		.json()

	return response
}
