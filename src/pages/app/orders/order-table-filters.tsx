import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
	return (
		<form className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filtros</span>
			<Input placeholder="ID do pedido" className="h-8 w-auto"></Input>
			<Input placeholder="Nome do client" className="h-8 w-80"></Input>
			<Select defaultValue="all">
				<SelectTrigger className="h-8 w-45">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Status</SelectLabel>
						<SelectItem value="all">Todos</SelectItem>
						<SelectItem value="pending">Pendente</SelectItem>
						<SelectItem value="canceled">Cancelado</SelectItem>
						<SelectItem value="processing">Em preparo</SelectItem>
						<SelectItem value="delivering">Em entrega</SelectItem>
						<SelectItem value="delivered">Entregue</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Button type="submit" variant="secondary">
				<Search className="h-4 w-4 mr-2" />
				<span className="text-sm">Filtrar resultados</span>
			</Button>

			<Button type="button" variant="outline">
				<X className="h-4 w-4 mr-2" />
				<span className="text-sm">Remover filtros</span>
			</Button>
		</form>
	)
}
