import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'
import { router } from './router'

import './index.css'

export function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />
			<Toaster />

			<ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ThemeProvider>
		</HelmetProvider>
	)
}
