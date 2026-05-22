import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { DateRangePicker } from '@/components/date-range-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

// const data = [
// 	{ date: '18/05', revenue: 1200 },
// 	{ date: '19/05', revenue: 850 },
// 	{ date: '20/05', revenue: 400 },
// 	{ date: '21/05', revenue: 920 },
// 	{ date: '22/05', revenue: 2300 },
// 	{ date: '23/05', revenue: 800 },
// 	{ date: '24/05', revenue: 640 },
// ]

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})

	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
	})

	return (
		<Card className="col-span-6">
			<CardHeader className="flex items-center justify-between">
				<div className="space-y-1">
					<CardTitle>Receita no período</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>

				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} ondateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{dailyRevenueInPeriod ? (
					<ResponsiveContainer width="100%" height={240}>
						<LineChart style={{ fontSize: 12 }} data={dailyRevenueInPeriod}>
							<XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

							<YAxis
								stroke="#888"
								axisLine={false}
								tickLine={false}
								tickFormatter={(value: number) =>
									(value / 100).toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})
								}
							/>

							<CartesianGrid vertical={false} className="stroke-muted" />

							<Line type="linear" strokeWidth={2} dataKey="receipt" stroke={colors.violet[400]} />
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className="flex h-60 w-full items-center justify-center">
						<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
