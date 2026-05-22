import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'

export function OrderTableSkeleton() {
	return Array.from({ length: 10 }).map((_, i) => {
		return (
			<TableRow key={i}>
				<TableCell align="center">
					<Button variant="outline" size="xs">
						<Search className="h-3 w-3" />
						<span className="sr-only">detalhes do pedido</span>
					</Button>
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-43" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-37" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-27.5" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-50" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-16" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-23" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-23" />
				</TableCell>
			</TableRow>
		)
	})
}
