import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loadCourses } from '../redux/slices/courseSlice';

const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.course);
  console.log('course' , list);
  
  useEffect(() => {
    console.log('shod');
    
    dispatch(loadCourses());
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;

  return (
    <div>
      {list.map(course => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CoursesPage;
