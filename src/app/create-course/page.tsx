'use client';

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCourse: React.FC = () => {
  const [description, setDescription] = useState("");
  const [chapters, setChapters] = useState<number | undefined>(undefined);
  const [includeVideo, setIncludeVideo] = useState(false);
  const [includeQuiz, setIncludeQuiz] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      alert("User not logged in!");
      return;
    }

    const courseData = {
      userId: user.id,
      description,
      chapters: chapters || 1,
      includeVideo,
      includeQuiz,
    };

    console.log("Submitting course:", courseData);

    try {
      const response = await fetch("/api/GenerateCourseGuide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate course guide.");
      }

      const data = await response.json();
      console.log("OpenAI Response:", data);

      router.push(`/course/${data.courseId}`);
    } catch (error) {
      console.error("Error generating course guide:", error);
      alert("There was an error generating the course guide. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Create Course</h1>

        <label className="block mb-4">
          <span className="text-gray-700">Course Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            rows={4}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Number of Chapters</span>
          <input
            type="number"
            value={chapters}
            onChange={(e) => setChapters(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </label>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeVideo}
            onChange={() => setIncludeVideo(!includeVideo)}
            className="mr-2"
          />
          <span className="text-gray-700">Include Video</span>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={includeQuiz}
            onChange={() => setIncludeQuiz(!includeQuiz)}
            className="mr-2"
          />
          <span className="text-gray-700">Include Quiz</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
