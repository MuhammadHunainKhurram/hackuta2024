'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For dynamic routing

interface Course {
  _id: string;
  userId: string;
  description: string;
  chapters: Array<{
    chapterNumber: number;
    chapterName: string;
    summary: string;
  }>;
  includeVideo: boolean;
  includeQuiz: boolean;
  createdAt: string;
}

const CoursePage: React.FC = () => {
  const params = useParams(); // Get route params
  const id = params?.id as string; // Proper casting to ensure access

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError("Course ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/getCourseById?id=${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.statusText}`);
        }

        const data: Course = await response.json();
        setCourse(data);
      } catch (error: any) {
        console.error("Error fetching course:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Course: {course._id}</h1>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>User ID:</strong> {course.userId}</p>
      <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleString()}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Chapters:</h2>
        {course.chapters.map((chapter) => (
          <div key={chapter.chapterNumber} className="mb-4">
            <h3 className="font-bold">
              Chapter {chapter.chapterNumber}: {chapter.chapterName}
            </h3>
            <p>{chapter.summary}</p>
          </div>
        ))}
      </div>

      <p><strong>Include Video:</strong> {course.includeVideo ? "Yes" : "No"}</p>
      <p><strong>Include Quiz:</strong> {course.includeQuiz ? "Yes" : "No"}</p>
    </div>
  );
};

export default CoursePage;
