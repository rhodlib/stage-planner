import React from 'react'
import { Download, FileText, RotateCcw } from 'lucide-react'

interface DownloadSectionProps {
  downloadUrl: string
  fileName: string
  onReset: () => void
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  downloadUrl, 
  fileName, 
  onReset 
}) => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="card bg-green-50 border-green-200">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-2xl p-4">
            <FileText className="h-10 w-10 text-green-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Processing Complete!
        </h3>
        <p className="text-green-700 mb-6">
          Your file has been successfully processed and is ready for download.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleDownload}
            className="btn-primary bg-green-600 hover:bg-green-700 w-full flex items-center justify-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download {fileName}</span>
          </button>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Process Another URL</span>
          </button>
        </div>

        <div className="mt-6 text-xs text-green-600">
          <p>File will be automatically deleted after 24 hours for security purposes.</p>
        </div>
      </div>
    </div>
  )
}

