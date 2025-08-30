/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@/types/course'
import axios from 'axios'

export const getCourseBySlug = async (slug: string): Promise<Course> => {
  try {
    console.log('🔎 Slug param:', slug)

    const response = await axios.get('/mock/course.json')
    console.log('✅ API Response:', response.data)

    const courses: Course[] = response.data

    console.log('📚 Available slugs:', courses.map(c => c.slug))

    const course = courses.find(c => c.slug.toString() === slug)

    if (course) {
      return course
    }
    throw new Error(`❌ دوره‌ای با slug "${slug}" یافت نشد`)
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('⚠️ Axios Error:', error.message)
      throw new Error('⛔ مشکل در بارگذاری فایل course.json')
    } else {
      console.error('⚠️ Custom Error:', error.message)
      throw error 
    }
  }
}
