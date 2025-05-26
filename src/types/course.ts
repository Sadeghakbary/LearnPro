export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}
