import { createContext, Dispatch, SetStateAction } from "react";

interface UserCourseListContextType {
  userCourseList: any[]; 
  setUserCourseList: Dispatch<SetStateAction<any[]>>;
}

export const UserCourseListContext = createContext<UserCourseListContextType | undefined>(undefined);
