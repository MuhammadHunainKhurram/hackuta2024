"use client";
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { HiMiniSquares2X2, HiLightBulb, HiClipboardDocumentCheck } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import LoadingDialog from './_components/LoadingDialog';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: 'Category',
      icon: <HiMiniSquares2X2 className="text-2xl" />
    },
    {
      id: 2,
      name: 'Topic & Desc',
      icon: <HiLightBulb className="text-2xl" />
    },
    {
      id: 3,
      name: 'Options',
      icon: <HiClipboardDocumentCheck className="text-2xl" />
    }
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (!userCourseInput) {
      return true;
    }
    if (activeIndex === 0 && (!userCourseInput?.category || userCourseInput?.category.length === 0)) {
      return true;
    }
    if (activeIndex === 1 && (!userCourseInput?.topic || userCourseInput?.topic.length === 0)) {
      return true;
    }
    if (
      activeIndex === 2 &&
      (
        userCourseInput?.level === undefined ||
        userCourseInput?.duration === undefined ||
        userCourseInput?.displayVideo === undefined ||
        userCourseInput?.noOfChapter === undefined
      )
    ) {
      return true;
    }
    return false;
  };

  // Hardcoded course data for now. Replace this with GPT-3 integration in the future.
  const generateCourseLayout = () => {
    setLoading(true);
    // Placeholder for ChatGPT integration.
    // Replace the following hardcoded data with ChatGPT-generated content.
    const courseLayout = {
      courseName: "Sample Course",
      description: "This is a sample description generated as a placeholder.",
      chapters: [
        { name: "Introduction", content: "This is the introduction chapter." },
        { name: "Advanced Concepts", content: "This is the advanced concepts chapter." }
      ],
      duration: userCourseInput?.duration || "4 weeks"
    };
    console.log("Generated Course Layout:", courseLayout);
    saveCourseLayout(courseLayout);
  };

  const saveCourseLayout = async (courseLayout: { courseName: string; description: string; chapters: { name: string; content: string; }[]; duration: any; }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courseData: {
            courseId: new Date().getTime(), // Replace this with a unique ID generator like UUID
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save course to the server");
      }

      const result = await response.json();
      console.log("Course saved successfully:", result);
      router.replace('/create-course/' + result.insertedId);
    } catch (error) {
      console.error("Failed to save course:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Stepper */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
        <div className='flex mt-10'>
          {StepperOptions.map((item, index) => (
            <div className='flex items-center' key={item.id}>
              <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index ? 'bg-purple-500' : ''}`}>
                  {item.icon}
                </div>
                <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
              </div>
              {index !== StepperOptions.length - 1 &&
                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index ? 'bg-purple-500' : ''}`}>
                </div>}
            </div>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>
      {/* Component  */}
        {activeIndex==0?<SelectCategory/>:
        activeIndex==1?<TopicDescription/>:
        <SelectOption/>}
      {/* Next Previous Button  */}
      <div className='flex justify-between mt-10'>
        <Button disabled={activeIndex==0} 
        variant='outline'
        onClick={()=>setActiveIndex(activeIndex-1)} >Previous</Button>
       {activeIndex<2&& <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
       {activeIndex==2&& <Button disabled={checkStatus()}  onClick={() => generateCourseLayout()}>Generate Course Layout</Button>}
      
      </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  )
}

export default CreateCourse