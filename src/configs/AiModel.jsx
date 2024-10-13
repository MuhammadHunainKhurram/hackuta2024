/*
 * Install the OpenAI Node.js library
 *
 * $ npm install openai
 */

const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI with your API key
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const generationConfig = {
  model: 'gpt-4',
  temperature: 1,
  max_tokens: 8192,
};

export const GenerateCourseLayout_AI = async () => {
  const prompt = `Generate a course tutorial in JSON format with the following details: Course Name, Description, along with Chapter Name, About, Duration. Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hour, No. of Chapters: 5.`;
  
  try {
    const response = await openai.createChatCompletion({
      ...generationConfig,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const reply = response.data.choices[0].message.content;
    console.log(reply);
    return reply;
  } catch (error) {
    console.error('Error generating course layout:', error);
    return null;
  }
};

export const GenerateChapterContent_AI = async () => {
  const prompt = `Explain the concept in detail on Topic: Python Basic, Chapter: Variables and Data Types, in JSON format with a list of arrays. Each entry should include the fields: title, explanation, and code example (use <precode> format for code if applicable).`;

  try {
    const response = await openai.createChatCompletion({
      ...generationConfig,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const reply = response.data.choices[0].message.content;
    console.log(reply);
    return reply;
  } catch (error) {
    console.error('Error generating chapter content:', error);
    return null;
  }
};

// Usage example:
// const courseLayout = await GenerateCourseLayout_AI();
// console.log(courseLayout);

// const chapterContent = await GenerateChapterContent_AI();
// console.log(chapterContent);
