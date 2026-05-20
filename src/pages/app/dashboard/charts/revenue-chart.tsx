import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
	{ date: '18/05', revenue: 1200 },
	{ date: '19/05', revenue: 850 },
	{ date: '20/05', revenue: 400 },
	{ date: '21/05', revenue: 920 },
	{ date: '22/05', revenue: 2300 },
	{ date: '23/05', revenue: 800 },
	{ date: '24/05', revenue: 640 },
]

export function RevenueChart() {
	return (
		<Card className="col-span-6">
			<CardHeader className="flex-row items-center justify-between">
				<div className="space-y-1">
					<CardTitle>Receita no período</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<LineChart style={{ fontSize: 12 }} data={data}>
						<XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

						<YAxis
							stroke="#888"
							axisLine={false}
							tickLine={false}
							tickFormatter={(value: number) =>
								value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})
							}
						/>

						<CartesianGrid vertical={false} className="stroke-muted" />

						<Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet[400]} />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
