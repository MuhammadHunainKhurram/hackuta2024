'use client';

import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
}

const DisplayCourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/getCourses", {
          method: "GET",
        });

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
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error if any

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {courses.length === 0 ? (
        <div className="justify-center p-2 col-span-full text-center text-white rounded-2xl bg-white bg-opacity-20">
          <p>Create your first course above!</p>
        </div>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            className="rounded-lg shadow-md p-4 bg-white bg-opacity-20"
          >
            <h2 className="font-bold text-xl mb-2">{course.title}</h2>
            <p className="text-white">{course.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayCourseList;
