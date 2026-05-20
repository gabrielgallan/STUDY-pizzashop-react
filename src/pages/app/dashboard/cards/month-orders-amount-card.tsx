import { UtensilsCrossed } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="font-semibold">Pedidos (mês)</CardTitle>
				<UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<span className="text-2xl font-bold tracking-tight">246</span>
				<p className="text-xs text-muted-foreground">
					<span className="font-semibold text-emerald-500 dark:text-emerald-400">+4%</span> Em
					relação ao mês passado
				</p>
			</CardContent>
		</Card>
	)
}
