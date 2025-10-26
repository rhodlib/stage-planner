import React, { useState } from 'react'
import { URLInput } from './URLInput'
import { ProcessingStatus } from './ProcessingStatus'
import { DownloadSection } from './DownloadSection'
import { ErrorMessage } from './ErrorMessage'

export interface ProcessingStep {
  id: string
  label: string
  status: 'pending' | 'active' | 'completed' | 'error'
  description?: string
}

export interface ProcessingResult {
  success: boolean
  downloadUrl?: string
  fileName?: string
  error?: string
}

const PROCESSING_STEPS: ProcessingStep[] = [
  {
    id: 'reading',
    label: 'Reading File',
    status: 'pending',
    description: 'Analyzing the provided URL and extracting content'
  },
  {
    id: 'generating-candidates',
    label: 'Generating Candidates',
    status: 'pending',
    description: 'Creating potential solutions based on the content'
  },
  {
    id: 'optimizing-prompts',
    label: 'Generating Optimal Prompts',
    status: 'pending',
    description: 'Crafting the most effective prompts for the task'
  },
  {
    id: 'evaluating',
    label: 'Evaluating Prompts',
    status: 'pending',
    description: 'Testing and scoring each prompt for effectiveness'
  },
  {
    id: 'selecting',
    label: 'Selecting Best Candidate',
    status: 'pending',
    description: 'Choosing the optimal solution from all candidates'
  }
]

export const URLProcessor: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (inputUrl: string) => {
    if (!inputUrl.trim()) {
      setError('Please enter a valid URL')
      return
    }

    // Validate URL format
    try {
      new URL(inputUrl)
    } catch {
      setError('Please enter a valid URL format (e.g., https://example.com)')
      return
    }

    setIsProcessing(true)
    setCurrentStep(0)
    setResult(null)
    setError(null)

    try {
      // Simulate processing steps
      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000))
      }

      // Get webhook URL from environment
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://rodolfotalibs.app.n8n.cloud/webhook-test/stage-planner'
      
      if (!webhookUrl) {
        throw new Error('Webhook URL is not configured')
      }

      // Call N8N webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputUrl }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get binary file from response
      const blob = await response.blob()
      
      // Create download URL from blob
      const blobUrl = URL.createObjectURL(blob)
      
      // Try to get filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition')
      let fileName = 'processed-file.txt'
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/i)
        if (fileNameMatch) {
          fileName = fileNameMatch[1]
        }
      }
      
      setResult({
        success: true,
        downloadUrl: blobUrl,
        fileName: fileName
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setIsProcessing(false)
    setCurrentStep(0)
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Process Your URL
        </h2>
        <p className="text-gray-600">
          Enter a URL to process and generate an optimized file for download
        </p>
      </div>

      <div className="card">
        <URLInput 
          onSubmit={handleSubmit}
          isProcessing={isProcessing}
          disabled={isProcessing}
        />
      </div>

      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      {isProcessing && (
        <ProcessingStatus 
          steps={PROCESSING_STEPS}
          currentStep={currentStep}
        />
      )}

      {result && result.success && (
        <DownloadSection 
          downloadUrl={result.downloadUrl!}
          fileName={result.fileName!}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

