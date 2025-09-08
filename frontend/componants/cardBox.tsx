import { translate, lang } from '@/localization'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Card, CardContent, CardMedia, IconButton, Typography, Chip, Avatar } from '@mui/material'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCourses } from '@/services/courseService'
import { Course } from '@/types/course'

export default function CardBox() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const scrollAmount = 320
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getAllCourses()
        setCourses(courseData.slice(0, 6)) // Show first 6 courses
      } catch (error) {
        console.error('Error fetching courses:', error)
        // Fallback to mock data if API fails
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const changeHandler = (slug: string) => {
    navigate(`/courses/${slug}`)
  }

  const isPersian = lang === 'fa'

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          {isPersian ? 'در حال بارگذاری...' : 'Loading...'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      padding: { xs: 2, md: 4 },
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: 4,
      my: 6,
      overflow: 'hidden'
    }}>
      {/* Header Section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            {translate.cardBox.courses}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            {isPersian ? 'دوره‌های آموزشی با کیفیت بالا' : 'High-quality educational courses'}
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={scrollLeft}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateX(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              },
              transition: 'all 0.3s ease',
            }}
            aria-label="Scroll Left"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={scrollRight}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateX(2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              },
              transition: 'all 0.3s ease',
            }}
            aria-label="Scroll Right"
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Courses Container */}
      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 3,
            paddingX: 1,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            pb: 2,
          }}
        >
          {courses.map((course) => (
            <Card
              key={course.id}
              onClick={() => changeHandler(course.slug)}
              sx={{
                minWidth: { xs: 300, md: 320 },
                maxWidth: { xs: 300, md: 320 },
                flexShrink: 0,
                borderRadius: 4,
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                  '& .course-image': {
                    transform: 'scale(1.1)',
                  },
                  '& .course-overlay': {
                    opacity: 1,
                  },
                },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Course Image */}
              <Box sx={{
                position: 'relative',
                height: 180,
                overflow: 'hidden',
                borderRadius: '16px 16px 0 0',
              }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={course.image_url}
                  alt={course.title}
                  sx={{
                    transition: 'transform 0.6s ease',
                    borderRadius: '16px 16px 0 0',
                  }}
                  className="course-image"
                />

                {/* Overlay */}
                <Box
                  className="course-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(156, 39, 176, 0.85) 0%, rgba(233, 30, 99, 0.85) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '16px 16px 0 0',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      textAlign: 'center',
                      px: 2,
                    }}
                  >
                    {isPersian ? 'مشاهده دوره' : 'View Course'}
                  </Typography>
                </Box>

                {/* Level Badge */}
                <Chip
                  label={course.level || 'beginner'}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#2196f3',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                  }}
                />
              </Box>

              {/* Course Content */}
              <CardContent sx={{ p: 3 }}>
                {/* Teacher Avatar */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      mr: isPersian ? 0 : 2,
                      ml: isPersian ? 2 : 0,
                    }}
                  >
                    {course.teacher.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.85rem' }}
                  >
                    {course.teacher}
                  </Typography>
                </Box>

                {/* Course Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    mb: 2,
                    lineHeight: 1.3,
                    color: 'text.primary',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {course.title}
                </Typography>

                {/* Course Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {course.description}
                </Typography>

                {/* Course Stats */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ fontWeight: 600 }}
                  >
                    {course.lessons?.length || 0} {isPersian ? 'درس' : 'lessons'}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.8rem' }}
                  >
                    {course.duration || 'N/A'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* View All Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline',
            },
            transition: 'all 0.3s ease',
          }}
          onClick={() => navigate('/courses')}
        >
          {isPersian ? 'مشاهده همه دوره‌ها' : 'View All Courses'}
        </Typography>
      </Box>
    </Box>
  )
}