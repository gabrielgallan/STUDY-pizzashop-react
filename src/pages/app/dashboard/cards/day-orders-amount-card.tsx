import { useQuery } from '@tanstack/react-query'
import { UtensilsCrossed } from 'lucide-react'
import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricsCardSkeleton } from '../skeletons/metrics-card-skeleton'

export function MonthDayOrdersAmountCard() {
	const { data: dayOrdersAmount } = useQuery({
		queryKey: ['metrics', 'day-orders-amount'],
		queryFn: getDayOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
				<UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{dayOrdersAmount ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{dayOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						{dayOrdersAmount.diffFromYesterday >= 0 ? (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-emerald-500 dark:text-emerald-400">
									+{dayOrdersAmount.diffFromYesterday}%
								</span>{' '}
								Em relação a ontem
							</p>
						) : (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-rose-500 dark:text-rose-400">
									{dayOrdersAmount.diffFromYesterday}%
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
