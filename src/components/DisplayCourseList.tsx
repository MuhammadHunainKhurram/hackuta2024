'use client';

import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
}

const DisplayCourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/getCourses");

        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }

        const data: Course[] = await response.json();
        setCourses(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching courses:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error if any

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="border border-gray-300 rounded-lg shadow-md p-4"
        >
          <h2 className="font-bold text-xl mb-2">{course.title}</h2>
          <p className="text-gray-700">{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayCourseList;
