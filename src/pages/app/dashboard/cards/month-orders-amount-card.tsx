import { UtensilsCrossed } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { MetricsCardSkeleton } from '../skeletons/metrics-card-skeleton'

export function MonthOrdersAmountCard() {
	const { data: monthOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-orders-amount'],
		queryFn: getMonthOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="font-semibold">Pedidos (mês)</CardTitle>
				<UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{monthOrdersAmount ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						{monthOrdersAmount.diffFromLastMonth >= 0 ? (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-emerald-500 dark:text-emerald-400">
									+{monthOrdersAmount.diffFromLastMonth}%
								</span>{' '}
								Em relação a ontem
							</p>
						) : (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-rose-500 dark:text-rose-400">
									{monthOrdersAmount.diffFromLastMonth}%
								</span>{' '}
								Em relação a ontem
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
