import React, { useState } from 'react'
import { Send, Link, Loader2 } from 'lucide-react'

interface URLInputProps {
  onSubmit: (url: string) => void
  isProcessing: boolean
  disabled: boolean
}

export const URLInput: React.FC<URLInputProps> = ({ 
  onSubmit, 
  isProcessing, 
  disabled 
}) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          Enter URL to Process
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            disabled={disabled}
            className="input-field pl-10"
            required
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Paste any valid URL to start the processing pipeline
        </p>
      </div>
      
      <button
        type="submit"
        disabled={disabled || !url.trim()}
        className="btn-primary w-full flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Start Processing</span>
          </>
        )}
      </button>
    </form>
  )
}

