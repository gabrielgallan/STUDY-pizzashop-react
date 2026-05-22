import { useQuery } from '@tanstack/react-query'
import { BarChart, Loader2 } from 'lucide-react'
import {
	Label,
	LabelList,
	type LabelProps,
	Pie,
	PieChart,
	type PieSectorShapeProps,
	ResponsiveContainer,
	Sector,
} from 'recharts'
import colors from 'tailwindcss/colors'
import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const chartColors = [
	colors.violet[500],
	colors.violet[400],
	colors.violet[300],
	colors.violet[200],
	colors.violet[100],
]

function CustomPieSector(props: PieSectorShapeProps) {
	return <Sector {...props} fill={chartColors[props.index % chartColors.length]} />
}

function CustomLabel(props: LabelProps) {
	return <Label {...props} position="outside" offset={12} fill="#888" fontSize={12} />
}

export function PopularProductsChart() {
	const { data: popularProducts } = useQuery({
		queryKey: ['metrics', 'popular-products'],
		queryFn: getPopularProducts,
	})

	return (
		<Card className="col-span-3">
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Produtos populares</CardTitle>
				<BarChart className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				{popularProducts ? (
					<ResponsiveContainer width="100%" height={240}>
						<PieChart style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
								dataKey="amount"
								nameKey="product"
								cx="50%"
								cy="50%"
								outerRadius={86}
								innerRadius={64}
								strokeWidth={8}
								className="stroke-background"
								shape={CustomPieSector}
							>
								<LabelList dataKey="product" content={CustomLabel} />
							</Pie>
						</PieChart>
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
