import clientPromise from '@/lib/mongo/clientPromise';
import { Db } from 'mongodb';

const databaseName: string | undefined = process.env.MONGODB_DB;

if (!databaseName) {
  throw new Error('Database is undefined. Make sure to set MONGODB_DB in your .env file.');
}

export interface Section {
    type: 'quiz' | 'content' | 'title';
    content?: string;
    quizQuestions?: string[];
    quizAnswers?: string[];
    title?: string;
}
  
export interface Chapter {
chapterTitle: string;
sections: Section[]; 
}

export interface CourseData {
title: string;
description: string;
duration: number;
instructor: string;
chapters: Chapter[];
}

export async function sendGeneratedCourse(courseData: CourseData) {
    try {
      const client = await clientPromise;
      const db: Db = client.db(databaseName);
      const result = await db.collection('generated_courses').insertOne(courseData);
      return result.insertedId;
    } catch (error) {
      console.error('Failed to send generated course:', error);
      throw error;
    }
  }
