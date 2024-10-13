import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { chapterName } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a course content generator.' },
        { role: 'user', content: `Generate content for chapters: ${chapterName}. Ensure the text uses the maximum character limit and adheres strictly to MARKDOWN format, while imitating textbook paragraphs. Do not include any reference to the chapter number or name. Take your time to carefully consider and craft the content without rushing.` },
      ],
      max_tokens: 1500,
    });

    const message = response?.choices?.[0]?.message?.content?.trim() ?? '';

    if (!message) {
      throw new Error('No content received from OpenAI.');
    }
        res.status(200).json({ content: message });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to generate chapter content' });
  }
}
