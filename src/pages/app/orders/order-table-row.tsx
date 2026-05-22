import { ArrowRight, Check, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './order-details'
import type { GetOrdersResponse, Order, OrderStatus } from '@/api/get-orders'
import { OrderStatusBadge } from './order-status'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import { approveOrder } from '@/api/approve-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { deliverOrder } from '@/api/deliver-order'

interface OrderTableRowProps {
	order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const queryClient = useQueryClient()

	function updateOrderStatusCache(orderId: string, status: OrderStatus) {
		const cached = queryClient.getQueriesData<GetOrdersResponse>({
			queryKey: ['orders'],
		})

		cached.forEach(([cachedKey, cachedData]) => {
			if (!cachedData) {
				return
			}

			queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
				...cachedData,
				orders: cachedData.orders.map((order) => {
					if (order.orderId === orderId) {
						return {
							...order,
							status,
						}
					}

					return order
				}),
			})
		})
	}

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
		mutationFn: approveOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusCache(orderId, 'processing')
		},
	})

	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
		mutationFn: cancelOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusCache(orderId, 'canceled')
		},
	})

	const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
		mutationFn: dispatchOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusCache(orderId, 'delivering')
		},
	})

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
		mutationFn: deliverOrder,
		onSuccess: (_, { orderId }) => {
			updateOrderStatusCache(orderId, 'delivered')
		},
	})

	return (
		<TableRow>
			<TableCell align="center">
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails open={isDetailsOpen} orderId={order.orderId} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>
			<TableCell className="text-muted-foreground">
				{formatDistanceToNow(order.createdAt, {
					locale: ptBR,
					addSuffix: true,
				})}
			</TableCell>
			<TableCell>
				<OrderStatusBadge status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">
				{(order.total / 100).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</TableCell>
			<TableCell>
				{order.status === 'pending' && (
					<Button
						onClick={() => approveOrderFn({ orderId: order.orderId })}
						variant="outline"
						size="xs"
						disabled={isApprovingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Aprovar
					</Button>
				)}

				{order.status === 'processing' && (
					<Button
						onClick={() => dispatchOrderFn({ orderId: order.orderId })}
						variant="outline"
						size="xs"
						disabled={isDispatchingOrder}
					>
						<ArrowRight className="h-3 w-3 mr-2" />
						Saiu para Entrega
					</Button>
				)}

				{order.status === 'delivering' && (
					<Button
						onClick={() => deliverOrderFn({ orderId: order.orderId })}
						variant="outline"
						size="xs"
						disabled={isDeliveringOrder}
					>
						<Check className="h-3 w-3 mr-2" />
						Entregue
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Button
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
					disabled={
						['processing', 'canceled', 'delivered'].includes(order.status) || isCancelingOrder
					}
					variant="ghost"
					size="xs"
				>
					<X className="h-3 w-3 mr-2" />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
