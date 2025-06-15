import axios from 'axios'
import { Course } from '@/types/course'

export const getCourses = async (): Promise<Course[]> => {
  const res = await axios.get('/mock/courses.json')
  return res.data
}

export const getCourseBySlug = async (slug: string): Promise<Course> => {
  const res = await axios.get(`/courses?slug=${slug}`)
  return res.data[0] 
}
