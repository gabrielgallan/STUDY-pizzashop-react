import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'
import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageTitle } from '@/components/page-title'

const signUpFormSchema = z.object({
	restaurantName: z.string(),
	managerName: z.string(),
	phone: z.string(),
	email: z.email(),
})

type SignUpFormType = z.infer<typeof signUpFormSchema>

export function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignUpFormType>()

	const navigate = useNavigate()

	const { mutateAsync: registerRestaurantFn } = useMutation({
		mutationFn: registerRestaurant,
	})

	async function handleSignUp(data: SignUpFormType) {
		try {
			await registerRestaurantFn({
				restaurantName: data.restaurantName,
				managerName: data.managerName,
				phone: data.phone,
				email: data.email,
			})

			toast.success('Estabelecimento cadastrado com sucesso', {
				position: 'top-right',
				action: {
					label: 'Login',
					onClick: () => navigate(`/sign-in?email=${data.email}`),
				},
			})
		} catch {
			toast.error('Erro ao cadastrar estabelecimento')
		}
	}

	return (
		<>
			<PageTitle title="Register" />
			<div className="p-8">
				<Button variant="ghost" asChild className="p-5 absolute right-8 top-8">
					<Link to="/sign-in">Fazer login</Link>
				</Button>

				<div className="w-87.5 flex flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
						<p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>

						<form onSubmit={handleSubmit(handleSignUp)} className="space-y-6 mt-4">
							<div className="space-y-2">
								<Label htmlFor="restaurantName">
									<strong>Nome do estabelecimento</strong>
								</Label>
								<Input id="restaurantName" type="text" {...register('restaurantName')} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="managerName">
									<strong>Seu nome</strong>
								</Label>
								<Input id="managerName" type="text" {...register('managerName')} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">
									<strong>Seu e-mail</strong>
								</Label>
								<Input id="email" type="email" {...register('email')} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">
									<strong>Seu celular</strong>
								</Label>
								<Input id="phone" type="tel" {...register('phone')} />
							</div>

							<Button
								className="w-full cursor-pointer py-5 bg-primary hover:bg-primary/90"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									'Finalizar cadastro'
								)}
							</Button>

							<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground ">
								Ao continuar, você concorda com nossos{' '}
								<a className="underline underline-offset-4" href="/">
									termos de serviço
								</a>{' '}
								e{' '}
								<a className="underline underline-offset-4" href="/">
									políticas de privacidade
								</a>
								.
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
