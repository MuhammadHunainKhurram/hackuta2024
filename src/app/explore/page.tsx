// import { fetchGeneratedCourses } from '@/lib/mongo/fetchGeneratedCourses';
import SendCourseButton from '../_components/SendCourseButton';

export default async function Home() {
  // const fetched_courses = await fetchGeneratedCourses();

  return (
    <div>
      <SendCourseButton />
    </div>
  );
}