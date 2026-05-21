import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'
import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageTitle } from '@/components/page-title'

const signInFormSchema = z.object({
	email: z.email(),
})

type SignInFormType = z.infer<typeof signInFormSchema>

export function SignIn() {
	const [searchParams] = useSearchParams()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInFormType>({
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	})

	async function handleSignIn(data: SignInFormType) {
		try {
			await authenticate({ email: data.email })

			toast.success('Enviamos um link de autenticação para o seu e-mail', {
				position: 'top-right',
				action: {
					label: 'Reenviar',
					onClick: () => handleSignIn(data),
				},
			})
		} catch {
			toast.error('Erro ao cadastrar estabelecimento')
		}
	}

	return (
		<>
			<PageTitle title="Sign In" />
			<div className="p-8">
				<Button variant="ghost" asChild className="p-5 absolute right-8 top-8">
					<Link to="/sign-up">Novo estabelecimento</Link>
				</Button>

				<div className="w-87.5 flex flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
						<p className="text-sm text-muted-foreground">
							Acompanhe suas vendas pelo painel do parceiro
						</p>

						<form onSubmit={handleSubmit(handleSignIn)} className="space-y-6 mt-4">
							<div className="space-y-2">
								<Label htmlFor="email">
									<strong>Seu e-mail</strong>
								</Label>
								<Input id="email" type="email" {...register('email')} />
							</div>

							<Button
								className="w-full cursor-pointer py-5 bg-primary hover:bg-primary/90"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									'Acessar painel'
								)}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
