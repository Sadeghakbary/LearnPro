import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseBySlug } from '@/services/courseService';
import { Course } from '@/types/course';
import { Box, Typography, CircularProgress, Card, CardContent, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function CourseDetailPage() {
  const { slug } = useParams(); 
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

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h3" fontWeight="bold" color="primary" textAlign="center" gutterBottom>
        {course.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
        مدرس: {course.teacher}
      </Typography>

      {course.lessons?.map((lesson) => (
        <Card key={lesson.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold">
                {lesson.title}
              </Typography>
              <Typography color="text.secondary">
                مدت زمان: {lesson.duration}
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
                تماشای ویدیو
              </Button>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LockIcon color="disabled" />
                <Typography color="text.secondary">این جلسه رایگان نیست</Typography>
              </Box>
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
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </Box>
          )}
        </Card>
      ))}
    </Box>
  );
}
