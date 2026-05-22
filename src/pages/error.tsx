import { PageTitle } from '@/components/page-title'
import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
	const error = useRouteError() as Error

	return (
		<>
			<PageTitle title="404" />
			<div className="flex h-screen flex-col items-center justify-center gap-2">
				<h1 className="text-4xl font-bold">Whoops, algo aonteceu...</h1>
				<p>Um erro aconteceu na aplicação, abaixo você encontra mais detalhes:</p>

				<pre>{error?.message || JSON.stringify(error)}</pre>
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
