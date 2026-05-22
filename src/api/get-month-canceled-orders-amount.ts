import { api } from '@/lib/ky'

export interface GetMonthCanceledOrdersAmountResponse {
	amount: number
	diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
	const response = await api
		.get<GetMonthCanceledOrdersAmountResponse>('/metrics/month-canceled-orders-amount')
		.json()

	return response
}
