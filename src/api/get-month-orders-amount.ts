import { api } from '@/lib/ky'

export interface GetMonthOrdersAmountResponse {
	amount: number
	diffFromLastMonth: number
}

export async function getMonthOrdersAmount() {
	const response = await api
		.get<GetMonthOrdersAmountResponse>('/metrics/month-orders-amount')
		.json()

	return response
}
