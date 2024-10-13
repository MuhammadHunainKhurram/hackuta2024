import { getGeneratedCourses } from '@/lib/mongo/generated_courses';

export async function fetchGeneratedCourses() {
  const { generated_courses } = await getGeneratedCourses();
  if (!generated_courses) throw new Error('Failed to fetch generated_courses!');
  return generated_courses;
}
