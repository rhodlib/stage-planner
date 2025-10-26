import React from 'react'
import { CheckCircle, Clock, Loader2 } from 'lucide-react'
import { ProcessingStep } from './URLProcessor'

interface ProcessingStatusProps {
  steps: ProcessingStep[]
  currentStep: number
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ 
  steps, 
  currentStep 
}) => {
  const getStepIcon = (stepIndex: number, currentStep: number) => {
    if (stepIndex < currentStep) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    if (stepIndex === currentStep) {
      return <Loader2 className="h-5 w-5 text-primary-600 animate-spin" />
    }
    return <Clock className="h-5 w-5 text-gray-400" />
  }

  const getStepStatus = (stepIndex: number, currentStep: number) => {
    if (stepIndex < currentStep) {
      return 'completed'
    }
    if (stepIndex === currentStep) {
      return 'active'
    }
    return 'pending'
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Processing Pipeline
        </h3>
        <p className="text-gray-600">
          Your URL is being processed through our advanced pipeline
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index, currentStep)
          const isActive = status === 'active'
          const isCompleted = status === 'completed'
          
          return (
            <div
              key={step.id}
              className={`flex items-start space-x-4 p-5 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-50 border border-primary-200' 
                  : isCompleted 
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStepIcon(index, currentStep)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium ${
                  isActive ? 'text-primary-900' : isCompleted ? 'text-green-900' : 'text-gray-700'
                }`}>
                  {step.label}
                </h4>
                {step.description && (
                  <p className={`text-sm mt-1 ${
                    isActive ? 'text-primary-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                )}
              </div>
              
              {isActive && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
          <p className="text-sm text-blue-800">
            Processing in progress... This may take a few minutes depending on the content size.
          </p>
        </div>
      </div>
    </div>
  )
}

