import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCourses } from '@/services/courseService'
import { Course } from '@/types/course'
import { lang } from '@/localization'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Container
} from '@mui/material'
import {
  PlayCircleOutline as PlayIcon,
  Lock as LockIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const isPersian = lang === 'fa'

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const courseData = await getAllCourses()
      setCourses(courseData)
    } catch (err) {
      setError(isPersian ? 'خطا در بارگذاری دوره‌ها' : 'Error loading courses')
      console.error('Fetch courses error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course.slug}`)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        color="primary"
      >
        {isPersian ? 'دوره‌های آموزشی' : 'Educational Courses'}
      </Typography>

      <Typography
        variant="h6"
        textAlign="center"
        mb={6}
        color="text.secondary"
      >
        {isPersian
          ? 'دوره‌های متنوع برنامه‌نویسی و مهارت‌های فنی را بیاموزید'
          : 'Learn various programming courses and technical skills'
        }
      </Typography>

      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
                borderRadius: 3,
                overflow: 'hidden'
              }}
              onClick={() => handleCourseClick(course)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image_url || '/assets/images/cardBox/js.jpg'}
                  alt={course.title}
                  sx={{ objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Chip
                    label={course.level}
                    size="small"
                    color={
                      course.level === 'beginner' ? 'success' :
                      course.level === 'intermediate' ? 'warning' : 'error'
                    }
                    sx={{ fontSize: '0.7rem' }}
                  />
                  {course.price && course.price > 0 && (
                    <Chip
                      label={`$${course.price}`}
                      size="small"
                      color="primary"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {course.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {course.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {course.duration}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    {course.teacher}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {course.lessons?.some(lesson => lesson.free) ? (
                      <Chip
                        label={isPersian ? 'دوره رایگان' : 'Free Course'}
                        size="small"
                        color="success"
                        icon={<PlayIcon />}
                      />
                    ) : (
                      <Chip
                        label={isPersian ? 'پرداخت' : 'Paid'}
                        size="small"
                        color="primary"
                        icon={<LockIcon />}
                      />
                    )}
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCourseClick(course)
                  }}
                >
                  {isPersian ? 'مشاهده دوره' : 'View Course'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {courses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {isPersian ? 'هیچ دوره‌ای یافت نشد' : 'No courses found'}
          </Typography>
        </Box>
      )}
    </Container>
  )
}