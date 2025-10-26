import React from 'react'
import { FileText, Zap } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 rounded-b-3xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary-600" />
            <Zap className="h-6 w-6 text-primary-500" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Stage Planner</h1>
            <p className="text-gray-600 mt-1">Advanced URL Processing Tool</p>
          </div>
        </div>
      </div>
    </header>
  )
}

