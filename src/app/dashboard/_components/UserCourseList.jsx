"use client";
import React, { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  const userCourseContext = useContext(UserCourseListContext);

  if (!userCourseContext) {
    throw new Error("UserCourseList must be used within a UserCourseListContext.Provider");
  }

  const { setUserCourseList } = userCourseContext;

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const response = await fetch(`/api/userCourses?email=${user.primaryEmailAddress.emailAddress}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const result = await response.json();
      setCourseList(result);
      setUserCourseList(result);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList.map((course, index) => (
              <CourseCard course={course} key={index} refreshData={getUserCourses} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
