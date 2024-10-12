import { getGeneratedCourses } from '@/lib/mongo/generated_courses'

async function fetchGeneratedCourses() {
  const { generated_courses } = await getGeneratedCourses()
  if (!generated_courses) throw new Error('Failed to fetch generated_courses!')

  return generated_courses
}

export default async function Home() {
  const generated_courses = await fetchGeneratedCourses()

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
