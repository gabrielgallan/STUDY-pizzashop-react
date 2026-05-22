import { render } from '@testing-library/react'
import { OrderStatusBadge } from './order-status'

// get => procura elemento, caso não exista retorna erro
// find => retorna uma Promise
// query => procura elemento, não retorna erro

describe('Order Status', () => {
	it('should apply the right text and class when status is pending', () => {
		const wrapper = render(<OrderStatusBadge status="pending" />)

		const statusText = wrapper.queryByText('Pendente')
		const badgeElement = wrapper.getByTestId('badge')

		expect(statusText).toBeInTheDocument()
		expect(badgeElement).toHaveClass('bg-slate-400')
	})

	it('should apply the right text and class when status is processing', () => {
		const wrapper = render(<OrderStatusBadge status="processing" />)

		const statusText = wrapper.queryByText('Processando')
		const badgeElement = wrapper.getByTestId('badge')

		expect(statusText).toBeInTheDocument()
		expect(badgeElement).toHaveClass('bg-amber-500')
	})

	it('should apply the right text and class when status is delivering', () => {
		const wrapper = render(<OrderStatusBadge status="delivering" />)

		const statusText = wrapper.queryByText('Em entrega')
		const badgeElement = wrapper.getByTestId('badge')

		expect(statusText).toBeInTheDocument()
		expect(badgeElement).toHaveClass('bg-amber-500')
	})

	it('should apply the right text and class when status is delivered', () => {
		const wrapper = render(<OrderStatusBadge status="delivered" />)

		const statusText = wrapper.queryByText('Entregue')
		const badgeElement = wrapper.getByTestId('badge')

		expect(statusText).toBeInTheDocument()
		expect(badgeElement).toHaveClass('bg-emerald-500')
	})

	it('should apply the right text and class when status is canceled', () => {
		const wrapper = render(<OrderStatusBadge status="canceled" />)

		const statusText = wrapper.queryByText('Cancelado')
		const badgeElement = wrapper.getByTestId('badge')

		expect(statusText).toBeInTheDocument()
		expect(badgeElement).toHaveClass('bg-rose-500')
	})
})
