'use client';
import { CourseData } from '@/lib/mongo/sendGeneratedCourse';

interface SendCourseProps {
  courseData: CourseData;
}

export const HandleSend = async ({ courseData }: SendCourseProps) => {
  try {
    const response = await fetch('/api/SendCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const courseToSend = await response.json();
    console.log(courseToSend);
    return courseToSend;
  } catch (error) {
    console.error('Failed to send course data:', error);
    throw error;
  }
};