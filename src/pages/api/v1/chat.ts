/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('http://211.22.118.150:3001/api/v1/rag/chat-with-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      console.log('req.body in chat api', req.body);

      if (!response.ok) {
        throw new Error('API 響應不正確');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('調用 API 時出錯：', error);
      res.status(500).json({ error: '內部服務器錯誤' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
