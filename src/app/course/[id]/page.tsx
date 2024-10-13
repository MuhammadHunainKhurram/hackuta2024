'use client';

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Chapter {
  chapterNumber: number;
  chapterName: string;
  summary: string;
}

interface Course {
  _id: string;
  userId: string;
  description: string;
  chapters: Chapter[];
  includeVideo: boolean;
  includeQuiz: boolean;
  createdAt: string;
}

const CoursePage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError("Course ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/getCourseById?id=${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.statusText}`);
        }

        const data: Course = await response.json();
        setCourse(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching course:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleScrollToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
        <aside className="w-1/5 p-4 bg-white shadow-lg">
            <ScrollArea className="h-full">
                <Card className="mb-4">
                <CardHeader className="flex justify-center items-center">
                    <CardTitle className="text-xl text-center">Chapters</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="flex flex-col items-center space-y-2">
                    {course.chapters.map((chapter, index) => (
                        <li key={chapter.chapterNumber} className="text-left w-full">
                        <Button
                            variant="link"
                            className="w-full text-left"
                            onClick={() => handleScrollToChapter(index)}
                        >
                            Chapter {chapter.chapterNumber}: {chapter.chapterName}
                        </Button>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </ScrollArea>
        </aside>


      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">
              {course.description}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator />
          </CardContent>
        </Card>

        <div className="space-y-8">
          {course.chapters.map((chapter, index) => (
            <div
              key={chapter.chapterNumber}
              ref={(el) => {
                chapterRefs.current[index] = el;
              }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-left mb-2">
                Chapter {chapter.chapterNumber}: {chapter.chapterName}
              </h2>
              <p className="text-gray-700">{chapter.summary}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
