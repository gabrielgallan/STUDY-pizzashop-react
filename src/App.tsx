import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ThemeProvider } from "./components/theme-provider"

import { Helmet, HelmetProvider } from 'react-helmet-async'

import './index.css'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />

      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}