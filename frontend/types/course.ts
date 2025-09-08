// src/types/course.ts
export interface Course {
  id: number;
  slug: string;
  title: string;
  teacher: string;
  description: string;
  image_url: string;
  price?: number;
  level?: string;
  duration?: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  duration: string;
  free: boolean;
  videoUrl: string;
}

export interface CourseError {
  error: string;
}