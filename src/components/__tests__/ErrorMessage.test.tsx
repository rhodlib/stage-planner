import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ErrorMessage } from '../ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message', () => {
    const mockOnDismiss = vi.fn()
    render(<ErrorMessage message="Test error message" onDismiss={mockOnDismiss} />)
    
    expect(screen.getByText('Error Processing Request')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnDismiss = vi.fn()
    render(<ErrorMessage message="Test error message" onDismiss={mockOnDismiss} />)
    
    const dismissButton = screen.getByRole('button')
    await user.click(dismissButton)
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('has proper styling for error state', () => {
    const mockOnDismiss = vi.fn()
    render(<ErrorMessage message="Test error message" onDismiss={mockOnDismiss} />)
    
    const errorContainer = screen.getByText('Error Processing Request').closest('div')
    expect(errorContainer).toHaveClass('bg-red-50')
  })
})

