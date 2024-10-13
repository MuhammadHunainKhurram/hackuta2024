'use client';
import { useState } from 'react';
import { CourseData } from '@/lib/mongo/sendGeneratedCourse';

interface InteractiveButtonProps {
  courseData: CourseData;
}

export const SendingButton = ({ courseData }: InteractiveButtonProps) => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    const response = await fetch('/api/SendCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    const courseToSend = await response.json();
    console.log(courseToSend);
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Sending...' : 'Click Me'}
    </button>
  );
};
