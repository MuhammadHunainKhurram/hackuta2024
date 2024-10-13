// pages/api/gpt.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
    }
  
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`OpenAI API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      const reply = data.choices[0].message.content;
  
      res.status(200).json({ reply });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  