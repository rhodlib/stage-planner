import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { URLInput } from '../URLInput'

describe('URLInput', () => {
  it('renders input field and submit button', () => {
    const mockOnSubmit = vi.fn()
    render(<URLInput onSubmit={mockOnSubmit} isProcessing={false} disabled={false} />)
    
    expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start processing/i })).toBeInTheDocument()
  })

  it('calls onSubmit with URL when form is submitted', async () => {
    const user = userEvent.setup()
    const mockOnSubmit = vi.fn()
    render(<URLInput onSubmit={mockOnSubmit} isProcessing={false} disabled={false} />)
    
    const urlInput = screen.getByPlaceholderText('https://example.com')
    const submitButton = screen.getByRole('button', { name: /start processing/i })
    
    await user.type(urlInput, 'https://example.com')
    await user.click(submitButton)
    
    expect(mockOnSubmit).toHaveBeenCalledWith('https://example.com')
  })

  it('disables input and button when processing', () => {
    const mockOnSubmit = vi.fn()
    render(<URLInput onSubmit={mockOnSubmit} isProcessing={true} disabled={true} />)
    
    const urlInput = screen.getByPlaceholderText('https://example.com')
    const submitButton = screen.getByRole('button', { name: /processing/i })
    
    expect(urlInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
  })

  it('shows processing state in button', () => {
    const mockOnSubmit = vi.fn()
    render(<URLInput onSubmit={mockOnSubmit} isProcessing={true} disabled={true} />)
    
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })
})

