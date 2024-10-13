import { getGeneratedCourses } from '@/lib/mongo/generated_courses'

async function fetchGeneratedCourses() {
  const { generated_courses } = await getGeneratedCourses()
  if (!generated_courses) throw new Error('Failed to fetch generated_courses!')

  return generated_courses
}

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generated_courses: any[] = await fetchGeneratedCourses()

  return (
    <div>
      <ul>
        {generated_courses.map(generated_course => (
          <li key={generated_course._id}>{generated_course.name}</li>
        ))}
      </ul>
    </div>
  )
}
