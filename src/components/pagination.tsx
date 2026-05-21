import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './ui/button'

interface PaginationProps {
	pageIndex: number
	totalCount: number
	perPage: number
	onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({ pageIndex, totalCount, perPage, onPageChange }: PaginationProps) {
	const pages = Math.ceil(totalCount / perPage) || 1

	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Total de {totalCount} item(s)</span>

			<div className="flex items-center gap-4 lg:gap-8">
				<div className="flex text-sm font-medium">
					Página {pageIndex + 1} de {pages}
				</div>
				<div className="flex items-center gap-2">
					<Button
						onClick={() => onPageChange(0)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pageIndex === 0}
					>
						<ChevronsLeft className="h-4 w-4" />
						<span className="sr-only">primeira página</span>
					</Button>
					<Button
						onClick={() => onPageChange(pageIndex - 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pageIndex === 0}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">página anterior</span>
					</Button>
					<Button
						onClick={() => onPageChange(pageIndex + 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pages <= pageIndex + 1}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">próxima página</span>
					</Button>
					<Button
						onClick={() => onPageChange(pages - 1)}
						variant="outline"
						className="h-4 w-4 p-4"
						disabled={pages <= pageIndex + 1}
					>
						<ChevronsRight className="h-4 w-4" />
						<span className="sr-only">última página</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
