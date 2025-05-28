const coursesData: Course[] = [
  {
    id: '1',
    title: 'React Basics',
    description: 'Learn the fundamentals of React.',
    lessons: []
  }
];

export const getCourses = async (): Promise<Course[]> => {
  return Promise.resolve(coursesData);
};
