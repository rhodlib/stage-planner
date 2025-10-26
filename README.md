# Stage Planner

A modern React application for processing URLs through an N8N pipeline with real-time status updates and file download capabilities.

## Features

- 🚀 **Modern React App**: Built with React 18, TypeScript, and Vite
- 🎨 **Responsive Design**: Beautiful UI with Tailwind CSS
- ⚡ **Real-time Processing**: Dynamic status updates during URL processing
- 🔗 **N8N Integration**: Seamless webhook integration with N8N workflows
- 📱 **Mobile Friendly**: Fully responsive design for all devices
- 🧪 **Comprehensive Testing**: Full test coverage with Vitest and Testing Library
- 🚀 **Vercel Ready**: Optimized for Vercel deployment

## Processing Pipeline

The application processes URLs through the following steps:

1. **Reading File** - Analyzing the provided URL and extracting content
2. **Generating Candidates** - Creating potential solutions based on the content
3. **Generating Optimal Prompts** - Crafting the most effective prompts for the task
4. **Evaluating Prompts** - Testing and scoring each prompt for effectiveness
5. **Selecting Best Candidate** - Choosing the optimal solution from all candidates

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- N8N instance with webhook endpoint

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stage-planner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
# Edit .env.local with your N8N webhook URL
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

### Required Variables

- `N8N_WEBHOOK_URL`: The URL of your N8N webhook endpoint

### Example Configuration

```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/process-url
```

## N8N Webhook Integration

### Expected Request Format

The application sends POST requests to your N8N webhook with the following payload:

```json
{
  "url": "https://example.com"
}
```

### Expected Response Format

Your N8N webhook should return:

```json
{
  "downloadUrl": "https://example.com/download/processed-file.txt",
  "fileName": "processed-file.txt"
}
```

### Response Fields

- `downloadUrl` (required): URL where the processed file can be downloaded
- `fileName` (optional): Name of the file (defaults to "processed-file.txt")

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run coverage
```

### Test Coverage

The project includes comprehensive tests for:
- Component rendering and behavior
- User interactions
- API integration
- Error handling
- Responsive design

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set the environment variable `N8N_WEBHOOK_URL` in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist/` directory to your hosting provider
3. Configure your webhook endpoint

## Project Structure

```
src/
├── components/           # React components
│   ├── __tests__/       # Component tests
│   ├── URLProcessor.tsx  # Main processing component
│   ├── URLInput.tsx     # URL input form
│   ├── ProcessingStatus.tsx # Status display
│   ├── DownloadSection.tsx  # Download interface
│   └── ErrorMessage.tsx    # Error handling
├── api/                 # API handlers
│   └── processUrl.ts    # N8N webhook handler
├── test/               # Test configuration
│   └── setup.ts        # Test setup
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vitest** - Testing framework
- **Testing Library** - Component testing
- **Vercel** - Deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

