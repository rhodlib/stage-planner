export default async function handler(req: any, res: any) {
  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      })
    }

    // Get N8N webhook URL from environment variables
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_URL environment variable is not set')
      return res.status(500).json({
        success: false,
        error: 'Service configuration error'
      })
    }

    // Call N8N webhook
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!n8nResponse.ok) {
      console.error('N8N webhook failed:', n8nResponse.status, n8nResponse.statusText)
      return res.status(502).json({
        success: false,
        error: 'Processing service temporarily unavailable'
      })
    }

    const n8nData = await n8nResponse.json()

    // Return the processed data from N8N
    res.json({
      success: true,
      downloadUrl: n8nData.downloadUrl,
      fileName: n8nData.fileName || 'processed-file.txt'
    })

  } catch (error) {
    console.error('Error processing URL:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}