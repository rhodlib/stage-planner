import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { URLProcessor } from '../../components/URLProcessor'

// Mock fetch
global.fetch = vi.fn()

describe('URLProcessor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the URL input form', () => {
    render(<URLProcessor />)
    
    expect(screen.getByText('Process Your URL')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start processing/i })).toBeInTheDocument()
  })

  it('shows error for empty URL submission', async () => {
    const user = userEvent.setup()
    render(<URLProcessor />)
    
    const submitButton = screen.getByRole('button', { name: /start processing/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument()
    })
  })

  it('shows error for invalid URL format', async () => {
    const user = userEvent.setup()
    render(<URLProcessor />)
    
    const urlInput = screen.getByPlaceholderText('https://example.com')
    const submitButton = screen.getByRole('button', { name: /start processing/i })
    
    await user.type(urlInput, 'invalid-url')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid URL format (e.g., https://example.com)')).toBeInTheDocument()
    })
  })

  it('processes valid URL and shows processing steps', async () => {
    const user = userEvent.setup()
    
    // Mock successful API response
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        downloadUrl: 'https://example.com/download/file.txt',
        fileName: 'processed-file.txt'
      })
    })

    render(<URLProcessor />)
    
    const urlInput = screen.getByPlaceholderText('https://example.com')
    const submitButton = screen.getByRole('button', { name: /start processing/i })
    
    await user.type(urlInput, 'https://example.com')
    await user.click(submitButton)
    
    // Check that processing status is shown
    await waitFor(() => {
      expect(screen.getByText('Processing Pipeline')).toBeInTheDocument()
    })
    
    // Check that all processing steps are displayed
    expect(screen.getByText('Reading File')).toBeInTheDocument()
    expect(screen.getByText('Generating Candidates')).toBeInTheDocument()
    expect(screen.getByText('Generating Optimal Prompts')).toBeInTheDocument()
    expect(screen.getByText('Evaluating Prompts')).toBeInTheDocument()
    expect(screen.getByText('Selecting Best Candidate')).toBeInTheDocument()
  })

  it('shows download section after successful processing', async () => {
    const user = userEvent.setup()
    
    // Mock successful API response
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        downloadUrl: 'https://example.com/download/file.txt',
        fileName: 'processed-file.txt'
      })
    })

    render(<URLProcessor />)
    
    const urlInput = screen.getByPlaceholderText('https://example.com')
    const submitButton = screen.getByRole('button', { name: /start processing/i })
    
    await user.type(urlInput, 'https://example.com')
    await user.click(submitButton)
    
    // Wait for processing to complete
    await waitFor(() => {
      expect(screen.getByText('Processing Complete!')).toBeInTheDocument()
    }, { timeout: 15000 })
    
    expect(screen.getByText('Download processed-file.txt')).toBeInTheDocument()
    expect(screen.getByText('Process Another URL')).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup()
    
    // Mock API error response
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    render(<URLProcessor />)
    
    const urlInput = screen.getByPlaceholderText('https://example.com')
    const submitButton = screen.getByRole('button', { name: /start processing/i })
    
    await user.type(urlInput, 'https://example.com')
    await user.click(submitButton)
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error Processing Request')).toBeInTheDocument()
    }, { timeout: 15000 })
  })
})

