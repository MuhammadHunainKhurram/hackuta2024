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

  const { chapterName, courseDescription } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a course content generator.' },
        {
          role: 'user',
          content: `
            Based on the course description: "${courseDescription}",
            generate **only the detailed content** for the chapter titled "${chapterName}".
            Ensure the response is **formatted in Markdown** and aligns only with the chapter title. 
            Do not include any metadata, JSON structures, or chapter headers. The response should be purely Markdown-formatted content.
          `,
        },
      ],
      max_tokens: 1500,
    });

    const message = response.choices?.[0]?.message?.content?.trim() ?? '';

    if (!message) {
      throw new Error('No content received from OpenAI.');
    }

    res.status(200).json({ content: message });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to generate chapter content' });
  }
}
