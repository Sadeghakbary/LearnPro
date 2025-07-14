import axios from 'axios';
import { Course } from '@/types/course';

const API_URL = 'https://6874ae00dd06792b9c94bb58.mockapi.io/learnPro/courses?slug=react-course';

export const getCourseBySlug = async (slug: string): Promise<Course> => {
  try {
    console.log('Fetching course with slug:', slug); 
    const response = await axios.get(`${API_URL}?slug=${slug}`, { timeout: 5000 });
    console.log('API Response:', response.data); 
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    throw new Error('دوره‌ای با این شناسه یافت نشد');
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(`خطا در دریافت اطلاعات دوره: `);
  }
};