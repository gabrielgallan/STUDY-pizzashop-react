import { UtensilsCrossed } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthDayOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
				<UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<span className="text-2xl font-bold tracking-tight">54</span>
				<p className="text-xs text-muted-foreground">
					<span className="font-semibold text-rose-500 dark:text-rose-400">-1%</span> Em relação a
					ontem
				</p>
			</CardContent>
		</Card>
	)
}
