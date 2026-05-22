import { api } from '@/lib/ky'

interface GetDailyRevenueInPeriodRequest {
	from?: Date
	to?: Date
}

type GetDailyRevenueInPeriodResponse = {
	date: string
	receipt: number
}[]

export async function getDailyRevenueInPeriod({ from, to }: GetDailyRevenueInPeriodRequest) {
	const response = await api
		.get<GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', {
			searchParams: {
				from: from?.toISOString(),
				to: to?.toISOString(),
			},
		})
		.json()

	return response
}
