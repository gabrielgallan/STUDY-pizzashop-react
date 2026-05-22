import { api } from '@/lib/ky'

export interface GetMonthRevenueResponse {
	receipt: number
	diffFromLastMonth: number
}

export async function getMonthRevenue() {
	const response = await api.get<GetMonthRevenueResponse>('/metrics/month-receipt').json()

	return response
}
