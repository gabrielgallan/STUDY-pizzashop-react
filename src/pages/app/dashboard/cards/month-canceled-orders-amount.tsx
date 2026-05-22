import { DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { MetricsCardSkeleton } from '../skeletons/metrics-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-canceled-orders-amount'],
		queryFn: getMonthCanceledOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{monthCanceledOrdersAmount ? (
					<>
						<span className="text-2xl font-bold tracking-tight">
							{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
						</span>
						{monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-rose-500 dark:text-rose-400">
									+{monthCanceledOrdersAmount.diffFromLastMonth}%
								</span>{' '}
								Em relação a ontem
							</p>
						) : (
							<p className="text-xs text-muted-foreground">
								<span className="font-semibold text-emerald-500 dark:text-emerald-400">
									{monthCanceledOrdersAmount.diffFromLastMonth}%
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
