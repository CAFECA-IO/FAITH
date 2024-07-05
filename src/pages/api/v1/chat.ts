/* TODO: for demo, workaround for http API endpoint (20240705 - Shirley) */
import { NextApiRequest, NextApiResponse } from 'next';
import { EXTERNAL_API } from '@/constants/url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  const { question } = req.body;

  try {
    const response = await fetch(EXTERNAL_API.LLAMA_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error('External API response unsuccessful');
    }

    // Set response headers to enable streaming
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    });

    const reader = response.body?.getReader();
    while (reader) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = new TextDecoder().decode(value);
      res.write(chunk);
    }
    res.end();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error calling API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
