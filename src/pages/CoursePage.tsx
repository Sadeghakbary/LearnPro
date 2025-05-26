import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { loadCourses } from '../redux/slices/courseSlice';

export default function CoursesPage() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(state => state.course); 

  useEffect(() => {
    dispatch(loadCourses());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>در حال بارگذاری...</p>}
      {error && <p>خطا: {error}</p>}
      {list.map(course => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
}
