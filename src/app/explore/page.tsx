import { CourseData } from '@/lib/mongo/sendGeneratedCourse';

export default async function Home() {

  const exampleCourseData: CourseData = {
    userID: "8328",
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

  return (
    <div>
      {/* <HandleCourseSend courseData={exampleCourseData}/> */}
    </div>
  )
}