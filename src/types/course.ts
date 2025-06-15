export interface Lesson {
  id: number
  title: string
  duration: string
  free: boolean
  videoUrl: string
}

export interface Course {
  id: number
  title: string
  slug: string
  teacher: string
  image: string
  price: number
  free: boolean
  category: string
  shortDescription: string
  lessons: Lesson[]
}
