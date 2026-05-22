import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'
import { PageTitle } from '@/components/page-title'
import { getOrders } from '@/api/get-orders'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { OrderTableSkeleton } from './order-table-skeleton'

export function Orders() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId') ?? undefined
	const customerName = searchParams.get('customerName') ?? undefined
	const status = searchParams.get('status') ?? undefined

	const pageIndex = z.coerce
		.number()
		.transform((page) => page - 1)
		.parse(searchParams.get('page') ?? '1')

	const { data: result, isLoading } = useQuery({
		queryKey: ['orders', pageIndex, orderId, customerName, status],
		queryFn: () =>
			getOrders({
				pageIndex,
				orderId,
				customerName,
				status: status === 'all' ? undefined : status,
			}),
	})

	function handlePaginate(page: number) {
		setSearchParams((url) => {
			url.set('page', (page + 1).toString())

			return url
		})
	}

	return (
		<>
			<PageTitle title="Orders" />
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
			</div>
			<div className="space-y-2.5">
				<OrderTableFilters />

				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-16"></TableHead>
								<TableHead className="w-42">Identificador</TableHead>
								<TableHead className="w-40">Realizado há</TableHead>
								<TableHead className="w-40">Status</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className="w-38">Total do pedido</TableHead>
								<TableHead className="w-41"></TableHead>
								<TableHead className="w-33"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading && <OrderTableSkeleton />}

							{result &&
								result.orders.map((order) => <OrderTableRow order={order} key={order.orderId} />)}
						</TableBody>
					</Table>
				</div>

				{result && (
					<Pagination
						onPageChange={handlePaginate}
						pageIndex={result.meta.pageIndex}
						totalCount={result.meta.totalCount}
						perPage={result.meta.perPage}
					/>
				)}
			</div>
		</>
	)
}
