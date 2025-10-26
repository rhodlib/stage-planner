import React from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onDismiss: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onDismiss 
}) => {
  return (
    <div className="card bg-red-50 border-red-200 rounded-3xl">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Error Processing Request
          </h3>
          <p className="mt-1 text-sm text-red-700">
            {message}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-100 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

