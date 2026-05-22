import type { OrderStatus } from '@/api/get-orders'

interface OrderStatusProps {
	status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
	pending: 'Pendente',
	canceled: 'Cancelado',
	delivered: 'Entregue',
	delivering: 'Em entrega',
	processing: 'Processando',
}

const orderStatusColorMap: Record<OrderStatus, string> = {
	pending: 'bg-slate-400',
	canceled: 'bg-rose-500',
	delivered: 'bg-emerald-500',
	delivering: 'bg-amber-500',
	processing: 'bg-amber-500',
}

export function OrderStatusBadge({ status }: OrderStatusProps) {
	const spanClass = `h-2 w-2 rounded-full ${orderStatusColorMap[status]}`

	return (
		<div className="flex items-center gap-2">
			<span data-testid="badge" className={spanClass}></span>
			<span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
		</div>
	)
}
