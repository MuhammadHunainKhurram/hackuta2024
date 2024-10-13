import { ObjectId } from 'mongodb';

export const CourseListSchema = {
  _id: ObjectId,
  courseId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  includeVideo: { type: String, required: true, default: 'Yes' },
  courseOutput: { type: Object, required: true },
  createdBy: { type: String, required: true },
  userName: { type: String, required: false },
  userProfileImage: { type: String, required: false },
  courseBanner: { type: String, required: false, default: '/placeholder.png' },
  publish: { type: Boolean, required: false, default: false },
};

export const ChaptersSchema = {
  _id: ObjectId,
  courseId: { type: String, required: true },
  chapterId: { type: Number, required: true },
  content: { type: Object, required: true },
  videoId: { type: String, required: true },
};