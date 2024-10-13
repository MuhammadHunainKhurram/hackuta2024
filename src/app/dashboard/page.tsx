'use client';

import React from "react";
import DisplayCourseList from "@/components/DisplayCourseList";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleAddCourse = () => {
    router.push("/create-course");
  };

  return (
    <div className={`p-8 justify-between bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 min-h-screen text-white ${poppins.className}`}>
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wider">Dashboard</h1>
      <div className="flex justify-center mb-6">
        <button 
          onClick={handleAddCourse} 
          className="bg-gray-300 bg-opacity-30 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
          Add Course
        </button>
      </div>
      <DisplayCourseList />
      
    </div>
  );
};

export default Dashboard;
