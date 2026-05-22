import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricsCardSkeleton } from '../skeletons/metrics-card-skeleton'

export function MonthRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-revenue'],
		queryFn: getMonthRevenue,
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="font-semibold">Receita total (mês)</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{monthRevenue ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
						{monthRevenue.diffFromLastMonth >= 0 ? (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-emerald-500 dark:text-emerald-400">
									+{monthRevenue.diffFromLastMonth}%
								</span>{' '}
								Em relação ao mês passado
							</p>
						) : (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-rose-500 dark:text-rose-400">
									{monthRevenue.diffFromLastMonth}%
								</span>{' '}
								Em relação ao mês passado
							</p>
						)}
					</>
				) : (
					<MetricsCardSkeleton />
				)}
			</CardContent>
		</Card>
	)
}
