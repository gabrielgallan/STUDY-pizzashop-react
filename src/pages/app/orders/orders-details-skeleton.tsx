import { Skeleton } from '@/components/ui/skeleton'
import {
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	Table,
} from '@/components/ui/table'

export function OrdersDetailsSkeleton() {
	return (
		<div className="space-y-6">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Status</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-4 w-20" />
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>Cliente</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-4 w-22" />
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>Telefone</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-4 w-26" />
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>E-mail</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-4 w-32" />
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>Realizado há</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-4 w-18" />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Produto</TableHead>
						<TableHead className="text-right">Qt.</TableHead>
						<TableHead className="text-right">Preço</TableHead>
						<TableHead className="text-right">Subtotal</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 2 }).map((_, i) => {
						return (
							<TableRow key={i}>
								<TableCell>
									<Skeleton className="h-4 w-18" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-4 ml-auto" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-8 ml-auto" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-10 ml-auto" />
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
				<TableFooter>
					<TableCell colSpan={3}>Total do pedido</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-10 ml-auto" />
					</TableCell>
				</TableFooter>
			</Table>
		</div>
	)
}
