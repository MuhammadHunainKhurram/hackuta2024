import { sendUser } from '@/lib/mongo/sendUser';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const userData = req.body;
    const userToSend = await sendUser(userData);
    res.status(200).json(userToSend);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}