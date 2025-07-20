import { Course } from '@/types/course';
import axios from 'axios';
import { ReactNode } from 'react';

export const getCourseBySlug = async (slug: ReactNode): Promise<Course> => {
  try {
    console.log('Fetching course with slug:', slug);
    const response = await axios.get(`/api/courses?slug=${slug}`);
    console.log('API Response:', response.data);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    throw new Error('دوره‌ای با این شناسه یافت نشد');
  } catch (error: unknown) {
    console.error('API Error:', error);
    throw new Error(`خطا در دریافت اطلاعات دوره: `);
  }
};