"use client";
import { useState } from 'react';

export default function SendCourseButton() {
  const [loading, setLoading] = useState(false);

  const exampleCourseData = {
    title: "Introduction to TypeScript",
    description: "A beginner-friendly course that introduces TypeScript and its core features.",
    duration: 10,
    instructor: "Jane Doe",
    chapters: [
      {
        chapterTitle: "Getting Started with TypeScript",
        sections: [
          {
            type: "title",
            title: "Welcome to TypeScript!"
          },
          {
            type: "content",
            content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
          },
          {
            type: "quiz",
            quizQuestions: [
              "What is TypeScript?",
              "How does TypeScript improve JavaScript development?"
            ],
            quizAnswers: [
              "TypeScript is a typed superset of JavaScript.",
              "It helps with static type checking and better tooling."
            ]
          }
        ]
      },
      {
        chapterTitle: "Advanced TypeScript Concepts",
        sections: [
          {
            type: "content",
            content: "In this chapter, we will dive into more advanced concepts like Generics and Decorators."
          },
          {
            type: "quiz",
            quizQuestions: [
              "What are Generics in TypeScript?",
              "What are Decorators used for?"
            ],
            quizAnswers: [
              "Generics allow creating reusable components.",
              "Decorators provide a way to modify classes and their members."
            ]
          }
        ]
      }
    ]
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sendGeneratedCourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exampleCourseData),
      });

      if (!res.ok) {
        throw new Error('Failed to send course data');
      }

      const data = await res.json();
      console.log('Course data sent:', data);
    } catch (error) {
      console.error('Error sending course data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Sending...' : 'Send Course Data'}
    </button>
  );
}
