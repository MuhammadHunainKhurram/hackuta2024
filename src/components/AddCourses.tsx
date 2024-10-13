'use client';

interface AddCoursesProps {
  onAddCourse: () => void;
}

const AddCourses: React.FC<AddCoursesProps> = ({ onAddCourse }) => {
  return (
    <button
      onClick={onAddCourse} 
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      + Add Course Here
    </button>
  );
};

export default AddCourses;
