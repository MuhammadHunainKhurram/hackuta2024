'use client';

import React from "react";
import AddCourses from "@/components/AddCourses";
import DisplayCourseList from "@/components/DisplayCourseList";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/create-course");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex justify-end mb-6">
        <AddCourses onAddCourse={handleAddCourse} />
      </div>
      <DisplayCourseList />
    </div>
  );
};

export default Dashboard;
