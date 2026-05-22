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
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

const orderFilterSchema = z.object({
	orderId: z.string(),
	customerName: z.string(),
	status: z.string().optional(),
})

type OrderFilterType = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } = useForm<OrderFilterType>({
		resolver: zodResolver(orderFilterSchema),
		defaultValues: {
			orderId: orderId ?? '',
			customerName: customerName ?? '',
			status: status ?? 'all',
		},
	})

	function handleFilter({ orderId, customerName, status }: OrderFilterType) {
		setSearchParams((url) => {
			if (orderId) {
				url.set('orderId', orderId)
			} else {
				url.delete('orderId')
			}

			if (customerName) {
				url.set('customerName', customerName)
			} else {
				url.delete('customerName')
			}

			if (status) {
				url.set('status', status)
			} else {
				url.delete('status')
			}

			url.set('page', '1')

			return url
		})
	}

	function handleClearFilters() {
		setSearchParams((url) => {
			url.delete('orderId')
			url.delete('customerName')
			url.delete('status')
			url.set('page', '1')

			return url
		})

		reset({
			orderId: '',
			customerName: '',
			status: 'all',
		})
	}

	return (
		<form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filtros</span>
			<Input placeholder="ID do pedido" className="h-8 w-auto" {...register('orderId')}></Input>
			<Input
				placeholder="Nome do client"
				className="h-8 w-80"
				{...register('customerName')}
			></Input>

			<Controller
				name="status"
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue="all"
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
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
					)
				}}
			/>

			<Button type="submit" variant="secondary">
				<Search className="h-4 w-4 mr-2" />
				<span className="text-sm">Filtrar resultados</span>
			</Button>

			<Button type="button" variant="outline" onClick={handleClearFilters}>
				<X className="h-4 w-4 mr-2" />
				<span className="text-sm">Remover filtros</span>
			</Button>
		</form>
	)
}
