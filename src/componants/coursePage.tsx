import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCourseBySlug } from '@/services/courseService'
import { Course } from '@/types/course'
import { Box, Typography } from '@mui/material'

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  useEffect(() => {
    if (slug) {
      getCourseBySlug(slug)
        .then((res) => {
          console.log('دوره دریافت‌شده:', res)
          setCourse(res)
        })
        .catch((err) => {
          console.error('خطا در گرفتن دوره:', err)
        })
    }
  }, [slug])

  if (!course) return <div>در حال بارگذاری...</div>

  return (
    <Box p={3}>
      <Typography variant='h4'>{course.title}</Typography>
      <Typography variant='subtitle1' mb={2}>
        مدرس: {course.teacher}
      </Typography>

      {course.lessons.map((lesson) => (
        <Box key={lesson.id} my={3} p={2} border='1px solid #ccc' borderRadius={2}>
          <Typography fontWeight='bold'>
            {lesson.title} ({lesson.duration})
          </Typography>
          {lesson.free ? (
            <video width='100%' controls style={{ marginTop: 8 }}>
              <source src={lesson.videoUrl} type='video/mp4' />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          ) : (
            <Typography color='gray' mt={1}>
              این جلسه رایگان نیست.
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  )
}
