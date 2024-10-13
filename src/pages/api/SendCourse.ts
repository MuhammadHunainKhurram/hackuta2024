import { sendGeneratedCourse } from '@/lib/mongo/sendGeneratedCourse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const courseData = req.body;
    const courseToSend = await sendGeneratedCourse(courseData);
    res.status(200).json(courseToSend);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}