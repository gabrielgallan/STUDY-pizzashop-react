import { BarChart } from 'lucide-react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
	{ product: 'Pepperoni', amount: 38 },
	{ product: 'Mussarela', amount: 25 },
	{ product: 'Marguerita', amount: 16 },
	{ product: 'Calabresa', amount: 33 },
	{ product: 'Portuguesa', amount: 40 },
]

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
	return (
		<Card className="col-span-3">
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Produtos populares</CardTitle>
				<BarChart className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={240}>
					<PieChart style={{ fontSize: 12 }}>
						<Pie
							data={data}
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
			</CardContent>
		</Card>
	)
}
