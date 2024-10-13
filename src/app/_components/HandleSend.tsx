'use client';
import { CourseData } from '@/lib/mongo/sendGeneratedCourse';
import { UserData } from '@/lib/mongo/sendUser';

interface SendCourseProps {
  courseData: CourseData;
}

interface SendUserProps {
    userData: UserData;
  }

export const HandleCourseSend = async ({ courseData }: SendCourseProps) => {
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


export const HandleUserSend = async ({ userData }: SendUserProps) => {
    try {
      const response = await fetch('/api/SendUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const userToSend = await response.json();
      console.log(userToSend);
      return userToSend;
    } catch (error) {
      console.error('Failed to send course data:', error);
      throw error;
    }
  };