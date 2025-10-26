import React from 'react'
import { Github, ExternalLink } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 rounded-t-3xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-600">
              © 2025 Stage Planner. Built with React and N8N.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors px-4 py-2 rounded-xl hover:bg-gray-50"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors px-4 py-2 rounded-xl hover:bg-gray-50"
            >
              <ExternalLink className="h-5 w-5" />
              <span>N8N</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

