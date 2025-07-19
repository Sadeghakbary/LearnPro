import { ReactNode } from "react";

// src/types/course.ts
export interface Course {
  id: number;
  slug: string;
  title: string;
  teacher: string;
  console : ReactNode;
  
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string; 
  duration: string;
  free: boolean;
  videoUrl: string;
  
}