import { render, screen } from '@/test/test-utils'
import { Loading, LoadingPage, LoadingSection, LoadingInline } from './loading'

describe('Loading components', () => {
  it('renders Loading with different sizes', () => {
    render(<Loading size="sm" />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByText('Loading...').parentElement).toHaveClass('w-4', 'h-4')

    render(<Loading size="md" />)
    expect(screen.getAllByText('Loading...')[1].parentElement).toHaveClass('w-6', 'h-6')

    render(<Loading size="lg" />)
    expect(screen.getAllByText('Loading...')[2].parentElement).toHaveClass('w-8', 'h-8')
  })

  it('renders LoadingPage component', () => {
    render(<LoadingPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByText('Loading...').parentElement).toHaveClass('w-8', 'h-8')
  })

  it('renders LoadingSection component', () => {
    render(<LoadingSection />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByText('Loading...').parentElement).toHaveClass('w-6', 'h-6')
  })

  it('renders LoadingInline component', () => {
    render(<LoadingInline />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.getByText('Loading...').parentElement).toHaveClass('w-4', 'h-4', 'inline-block')
  })
}) 