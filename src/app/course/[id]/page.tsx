'use client';

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Chapter {
  chapterNumber: number;
  chapterName: string;
  summary: string;
  content?: string;
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
  const [chapterContents, setChapterContents] = useState<Record<number, string>>({});
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoId, setVideoId] = useState<string | null>(null);

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

        if (data.includeVideo) {
          fetchYouTubeVideo(data.description);
        }

        data.chapters.forEach((chapter) =>
          generateChapterContent(chapter.chapterName, chapter.chapterNumber, data.description)
        );
      } catch (error: unknown) {
        console.error("Error fetching course:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const fetchYouTubeVideo = async (query: string) => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            key: API_KEY,
            maxResults: 1,
            type: "video",
          },
        }
      );

      const videoId = response.data.items[0]?.id?.videoId;
      setVideoId(videoId);
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
      setVideoId(null);
    }
  };

  const generateChapterContent = async (
    chapterName: string,
    chapterNumber: number,
    courseDescription: string
  ) => {
    try {
      const response = await axios.post("/api/generateChapterContent", {
        chapterName,
        courseDescription,
      });

      if (response.status === 200) {
        setChapterContents((prev) => ({
          ...prev,
          [chapterNumber]: response.data.content,
        }));
      } else {
        console.error(`Failed to generate content for chapter ${chapterNumber}`);
      }
    } catch (error) {
      console.error(`Error generating content for chapter ${chapterNumber}:`, error);
    }
  };

  const handleScrollToChapter = (index: number) => {
    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
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
                      {chapter.chapterName}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </ScrollArea>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center">
              {course.description}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator />
            {videoId && (
              <div className="mt-4 relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Course Video"
                ></iframe>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          {course.chapters.map((chapter, index) => (
            <div
            key={chapter.chapterNumber}
            ref={(el) => {
              if (el) chapterRefs.current[index] = el;
            }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-left mb-2">
              {chapter.chapterName}
            </h2>
            <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
              {chapterContents[chapter.chapterNumber] || "Generating content..."}
            </ReactMarkdown>
          </div>
          
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
