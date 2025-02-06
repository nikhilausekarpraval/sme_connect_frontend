import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (token) {
    res.setHeader(
      'Set-Cookie',
      serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        maxAge: 60 * 60 * 78, 
        path: '/',
      })
    );

    res.status(200).json({ message: 'Token stored successfully' });
  } else {
    res.status(400).json({ message: 'Token is missing' });
  }
}
