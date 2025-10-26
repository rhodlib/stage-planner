import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProcessingStatus } from '../ProcessingStatus'
import { ProcessingStep } from '../URLProcessor'

describe('ProcessingStatus', () => {
  const mockSteps: ProcessingStep[] = [
    {
      id: 'step1',
      label: 'Step 1',
      status: 'pending',
      description: 'First step description'
    },
    {
      id: 'step2',
      label: 'Step 2',
      status: 'pending',
      description: 'Second step description'
    }
  ]

  it('renders all processing steps', () => {
    render(<ProcessingStatus steps={mockSteps} currentStep={0} />)
    
    expect(screen.getByText('Processing Pipeline')).toBeInTheDocument()
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('shows current step as active', () => {
    render(<ProcessingStatus steps={mockSteps} currentStep={1} />)
    
    // Step 1 should be completed, Step 2 should be active
    const step2Element = screen.getByText('Step 2').closest('div')
    expect(step2Element).toHaveClass('bg-primary-50')
  })

  it('shows completed steps with checkmark', () => {
    render(<ProcessingStatus steps={mockSteps} currentStep={1} />)
    
    // Check that completed step has checkmark icon
    const step1Element = screen.getByText('Step 1').closest('div')
    expect(step1Element).toHaveClass('bg-green-50')
  })

  it('displays processing message', () => {
    render(<ProcessingStatus steps={mockSteps} currentStep={0} />)
    
    expect(screen.getByText(/processing in progress/i)).toBeInTheDocument()
  })
})

