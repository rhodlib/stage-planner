import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DownloadSection } from '../DownloadSection'

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: vi.fn(() => 'mock-blob-url'),
    revokeObjectURL: vi.fn(),
  },
  writable: true,
})

describe('DownloadSection', () => {
  const mockProps = {
    downloadUrl: 'https://example.com/download/file.txt',
    fileName: 'processed-file.txt',
    onReset: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders download section with success message', () => {
    render(<DownloadSection {...mockProps} />)
    
    expect(screen.getByText('Processing Complete!')).toBeInTheDocument()
    expect(screen.getByText('Download processed-file.txt')).toBeInTheDocument()
    expect(screen.getByText('Process Another URL')).toBeInTheDocument()
  })

  it('calls onReset when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<DownloadSection {...mockProps} />)
    
    const resetButton = screen.getByText('Process Another URL')
    await user.click(resetButton)
    
    expect(mockProps.onReset).toHaveBeenCalledTimes(1)
  })

  it('creates download link when download button is clicked', async () => {
    const user = userEvent.setup()
    
    // Mock document.createElement and appendChild
    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    }
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(vi.fn())
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(vi.fn())
    
    render(<DownloadSection {...mockProps} />)
    
    const downloadButton = screen.getByText('Download processed-file.txt')
    await user.click(downloadButton)
    
    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(mockLink.href).toBe(mockProps.downloadUrl)
    expect(mockLink.download).toBe(mockProps.fileName)
    expect(mockLink.click).toHaveBeenCalled()
    
    // Cleanup
    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
    removeChildSpy.mockRestore()
  })

  it('shows security notice', () => {
    render(<DownloadSection {...mockProps} />)
    
    expect(screen.getByText(/file will be automatically deleted after 24 hours/i)).toBeInTheDocument()
  })
})

