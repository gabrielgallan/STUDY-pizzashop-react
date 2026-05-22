import { Link } from 'react-router-dom'
import { PageTitle } from '@/components/page-title'

export function NotFound() {
	return (
		<>
			<PageTitle title="404" />
			<div className="flex h-screen flex-col items-center justify-center gap-2">
				<h1 className="text-4xl font-bold">Página não encontrada</h1>
				<p className="text-muted-foreground">
					Voltar para o{' '}
					<Link to="/" className="text-sky-500 dark:text-sky-400">
						Dashboard
					</Link>
				</p>
			</div>
		</>
	)
}
