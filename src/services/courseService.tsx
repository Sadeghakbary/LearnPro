import { Course } from '@/types/course'
import axios from 'axios'


export const getCourseBySlug = async (slug: string): Promise<Course> => {
  try {
    console.log('Fetching course with slug:', slug)
    const response = await axios.get(`/api/courses?slug=${slug}`);
    console.log('API Response:', response.data)

    if (response.data && response.data.length > 0) {
      return response.data[0]
    }
    throw new Error('دوره‌ای با این شناسه یافت نشد')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('API Error:', error)
    throw new Error(`خطا در دریافت اطلاعات دوره: ${error.message}`)
  }
}
