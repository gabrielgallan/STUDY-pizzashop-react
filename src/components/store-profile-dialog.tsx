import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import { Button } from './ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
})

type StoreProfileType = z.infer<typeof storeProfileSchema>

export function StorePofileDialog() {
	const { data: managedRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		staleTime: Infinity,
	})

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<StoreProfileType>({
		resolver: zodResolver(storeProfileSchema),
		values: {
			name: managedRestaurant?.name || '',
			description: managedRestaurant?.description || '',
		},
	})

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
	})

	async function handleUpdateStore(data: StoreProfileType) {
		try {
			await updateProfileFn({
				name: data.name,
				description: data.description,
			})

			toast.success('Perfil atualizado com sucesso')
		} catch {
			toast.error('Falha ao atualizar o perfil, tente novamente mais tarde')
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da loja</DialogTitle>
				<DialogDescription>Atualize as informações do seu estabelecimento</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleSubmit(handleUpdateStore)}>
				<div className="space-y-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="name">
							Nome
						</Label>
						<Input id="name" className="col-span-3" {...register('name')} />
					</div>

					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right" htmlFor="description">
							Descrição
						</Label>
						<Textarea id="description" className="col-span-3" {...register('description')} />
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost" type="button">
							Cancelar
						</Button>
					</DialogClose>
					<Button variant="success" type="submit" disabled={isSubmitting}>
						Salvar
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	)
}
