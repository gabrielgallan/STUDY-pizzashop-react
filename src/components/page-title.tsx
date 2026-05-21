import { Helmet } from 'react-helmet-async'

interface PageTitleProps {
	title?: string
}

export function PageTitle({ title }: PageTitleProps) {
	return <Helmet title={title ? `${title} | pizza.shop` : `pizza.shop`} />
}
