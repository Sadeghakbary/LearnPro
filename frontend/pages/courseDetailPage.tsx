import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseBySlug } from '@/services/courseService';
import { Course } from '@/types/course';
import { Box, Typography, CircularProgress, Card, CardContent, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { lang } from '@/localization';
import { useAppSelector } from '@/redux/store';
import { userInfo } from '@/redux/slices/userSlice';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const user = useAppSelector(userInfo);
  const isAuthenticated = !!user.token;
  const isPersian = lang === 'fa';

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("شناسه‌ی دوره نامعتبر است");
      setLoading(false);
      return;
    }
    setLoading(true);
    getCourseBySlug(slug)
      .then((res) => {
        setCourse(res);
        setError(null);
      })
      .catch((err) => {
        console.error('Error loading course:', err);
        setError(err.message || "خطا در بارگذاری دوره");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">دوره یافت نشد</Typography>
      </Box>
    );
  }

  // Get course title and teacher - use existing localization system
  const courseTitle = course.title || 'No title';
  const courseTeacher = course.teacher || 'No teacher';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h3" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
        {courseTitle}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
        {lang === 'fa' ? `مدرس: ${courseTeacher}` : `Teacher: ${courseTeacher}`}
      </Typography>

      {course.lessons?.map((lesson) => {
        // Get lesson title and description
        const lessonTitle = lesson.title || 'No title';
        const lessonDescription = lesson.description || '';

        return (
          <Card key={lesson.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box flex={1}>
                <Typography variant="h6" fontWeight="bold">
                  {lessonTitle}
                </Typography>
                {lessonDescription && (
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {lessonDescription}
                  </Typography>
                )}
                <Typography color="text.secondary">
                  {lang === 'fa' ? `مدت زمان: ${lesson.duration}` : `Duration: ${lesson.duration}`}
                </Typography>
              </Box>
              {lesson.free ? (
                <Button
                  variant="contained"
                  color="primary"
                  href={lesson.videoUrl}
                  target="_blank"
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{ px: 3 }}
                >
                  {lang === 'fa' ? 'تماشای ویدیو' : 'Watch Video'}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate('/login', { state: { from: { pathname: `/courses/${slug}` } } });
                    }
                  }}
                  startIcon={<LockIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  {isAuthenticated
                    ? (isPersian ? 'دوره کامل را خریداری کنید' : 'Purchase Full Course')
                    : (isPersian ? 'برای دسترسی وارد شوید' : 'Login to Access')
                  }
                </Button>
              )}
            </CardContent>

            {lesson.free && (
              <Box sx={{ p: 2 }}>
                <video
                  width="100%"
                  controls
                  style={{ borderRadius: 8 }}
                >
                  <source src={lesson.videoUrl} type="video/mp4" />
                  {lang === 'fa' ? 'مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.' : 'Your browser does not support video playback.'}
                </video>
              </Box>
            )}
          </Card>
        );
      })}
    </Box>
  );
}
