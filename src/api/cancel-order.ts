import { api } from '@/lib/ky'

interface CancelOrderRequest {
	orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderRequest) {
	await api.patch(`/orders/${orderId}/cancel`)
}
