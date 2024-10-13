import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropdownOption from './DropdownOption';
import { MongoClient, ObjectId } from 'mongodb';
import Link from 'next/link';

async function connectToDatabase() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    return client.db();
}

function CourseCard({course,refreshData,displayUser=false}) {

    const handleOnDelete = async () => {
        try {
            const db = await connectToDatabase();
            const result = await db.collection('CourseList').deleteOne({ _id: new ObjectId(course?.id) });
            
            if (result.deletedCount > 0) {
                refreshData();
            }
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

  return (
    <div className='shadow-sm rounded-lg border p-2
     cursor-pointer mt-4 hover:border-primary'>
        <Link href={'/course/' + course?.courseId}>
            <Image src={course?.courseBanner} width={300} height={200}
            className='w-full h-[200px] object-cover rounded-lg'
            />
        </Link>
        <div className='p-2'>
            <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.course?.name}
            
           {!displayUser && <DropdownOption
            handleOnDelete={() => handleOnDelete()}
            ><HiMiniEllipsisVertical/></DropdownOption>}
            </h2>
            
            <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
            <div className='flex items-center justify-between'>
                <h2 className='flex gap-2 items-center
                 p-1 bg-purple-50 text-primary text-sm rounded-sm'>
                    <HiOutlineBookOpen/>{course?.courseOutput?.course?.numberOfChapters} Chapters</h2>
                <h2 className='text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.level}</h2>
            </div>
          {displayUser &&  <div className='flex gap-2 items-center mt-2'>
                <Image src={course?.userProfileImage} width={35} height={35}
                className='rounded-full'
                />
                <h2 className='text-sm'>{course?.userName}</h2>
            </div>}
        </div>
    </div>
  );
}

export default CourseCard;