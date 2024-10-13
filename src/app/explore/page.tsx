import { fetchGeneratedCourses } from '@/lib/mongo/fetchGeneratedCourses'
import { sendGeneratedCourse } from '@/lib/mongo/sendGeneratedCourse'
import { CourseData } from '@/lib/mongo/sendGeneratedCourse';

export default async function Home() {
  const fetched_courses = await fetchGeneratedCourses()

  const exampleCourseData: CourseData = {
    title: "Introduction to TypeScript",
    description: "A beginner-friendly course that introduces TypeScript and its core features.",
    duration: 10, // in hours
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

  const courseToSend = await sendGeneratedCourse(exampleCourseData)

  return (
    <div>
      <ul>
        {fetched_courses.map(fetched_course => (
          <li key={fetched_course._id}>Course Name: {fetched_course.name}</li>
        ))}
      </ul>
    </div>
  )
}