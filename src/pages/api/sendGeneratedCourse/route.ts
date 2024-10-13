import { NextResponse } from 'next/server';
import { sendGeneratedCourse, CourseData } from '@/lib/mongo/sendGeneratedCourse';

export async function POST(request: Request) {
  try {
    const courseData: CourseData = await request.json();
    const insertedId = await sendGeneratedCourse(courseData);
    return NextResponse.json({ insertedId });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.error();
  }
}
