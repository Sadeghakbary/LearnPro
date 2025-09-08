import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { lang } from '@/localization'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Container,
  Fade,
  Paper
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image_url: string
  readTime: number
  publishedAt: string
  featured: boolean
}

export default function BlogsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const isPersian = lang === 'fa'

  // Mock blog data with bilingual support
  const getBlogPosts = (): BlogPost[] => [
    {
      id: 1,
      slug: 'react-hooks-guide',
      title: isPersian ? 'راهنمای کامل React Hooks' : 'Complete Guide to React Hooks',
      excerpt: isPersian
        ? 'آموزش جامع و کاربردی React Hooks از پایه تا پیشرفته با مثال‌های عملی'
        : 'Comprehensive and practical guide to React Hooks from basics to advanced with real examples',
      content: 'Full content here...',
      author: isPersian ? 'سارا احمدی' : 'Sara Ahmadi',
      category: isPersian ? 'React' : 'React',
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
      image_url: '/assets/images/cardBox/js.jpg',
      readTime: 8,
      publishedAt: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      slug: 'typescript-best-practices',
      title: isPersian ? 'بهترین روش‌های TypeScript' : 'TypeScript Best Practices',
      excerpt: isPersian
        ? 'راهنمایی جامع برای نوشتن کد TypeScript تمیز و قابل نگهداری'
        : 'Comprehensive guide for writing clean and maintainable TypeScript code',
      content: 'Full content here...',
      author: isPersian ? 'علی رضایی' : 'Ali Rezaei',
      category: isPersian ? 'TypeScript' : 'TypeScript',
      tags: ['TypeScript', 'Best Practices', 'JavaScript'],
      image_url: '/assets/images/cardBox/js.jpg',
      readTime: 12,
      publishedAt: '2024-01-10',
      featured: false
    },
    {
      id: 3,
      slug: 'modern-css-techniques',
      title: isPersian ? 'تکنیک‌های مدرن CSS' : 'Modern CSS Techniques',
      excerpt: isPersian
        ? 'آموزش تکنیک‌های پیشرفته CSS شامل Grid، Flexbox و انیمیشن‌ها'
        : 'Learn advanced CSS techniques including Grid, Flexbox, and animations',
      content: 'Full content here...',
      author: isPersian ? 'مریم حسینی' : 'Maryam Hosseini',
      category: isPersian ? 'CSS' : 'CSS',
      tags: ['CSS', 'Grid', 'Flexbox', 'Animations'],
      image_url: '/assets/images/cardBox/HTML.jpg',
      readTime: 10,
      publishedAt: '2024-01-08',
      featured: true
    },
    {
      id: 4,
      slug: 'nodejs-backend-development',
      title: isPersian ? 'توسعه Backend با Node.js' : 'Backend Development with Node.js',
      excerpt: isPersian
        ? 'آموزش کامل توسعه سمت سرور با Node.js و Express'
        : 'Complete guide to server-side development with Node.js and Express',
      content: 'Full content here...',
      author: isPersian ? 'حسین کریمی' : 'Hossein Karimi',
      category: isPersian ? 'Node.js' : 'Node.js',
      tags: ['Node.js', 'Express', 'Backend', 'API'],
      image_url: '/assets/images/cardBox/js.jpg',
      readTime: 15,
      publishedAt: '2024-01-05',
      featured: false
    },
    {
      id: 5,
      slug: 'python-data-science',
      title: isPersian ? 'علوم داده با Python' : 'Data Science with Python',
      excerpt: isPersian
        ? 'آموزش علوم داده و یادگیری ماشین با کتابخانه‌های Python'
        : 'Learn data science and machine learning with Python libraries',
      content: 'Full content here...',
      author: isPersian ? 'فاطمه رضایی' : 'Fateme Rezaei',
      category: isPersian ? 'Python' : 'Python',
      tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas'],
      image_url: '/assets/images/cardBox/Python.jpg',
      readTime: 18,
      publishedAt: '2024-01-03',
      featured: true
    },
    {
      id: 6,
      slug: 'git-version-control',
      title: isPersian ? 'کنترل نسخه با Git' : 'Version Control with Git',
      excerpt: isPersian
        ? 'آموزش کامل Git و GitHub برای مدیریت پروژه‌های نرم‌افزاری'
        : 'Complete guide to Git and GitHub for software project management',
      content: 'Full content here...',
      author: isPersian ? 'رضا محمدی' : 'Reza Mohammadi',
      category: isPersian ? 'ابزارها' : 'Tools',
      tags: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
      image_url: '/assets/images/cardBox/js.jpg',
      readTime: 6,
      publishedAt: '2024-01-01',
      featured: false
    }
  ]

  const blogPosts = getBlogPosts()
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in={isVisible} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isPersian ? 'مقالات آموزشی' : 'Educational Articles'}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              {isPersian
                ? 'مقالات آموزشی جامع در زمینه برنامه‌نویسی و فناوری'
                : 'Comprehensive educational articles on programming and technology'
              }
            </Typography>
          </Box>
        </Fade>

        {/* Search and Filter Section */}
        <Fade in={isVisible} timeout={1200}>
          <Paper
            elevation={8}
            sx={{
              p: 3,
              mb: 6,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder={isPersian ? 'جستجو در مقالات...' : 'Search articles...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {categories.map((category) => (
                    <Chip
                      key={category}
                      label={category === 'all' ? (isPersian ? 'همه' : 'All') : category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? 'filled' : 'outlined'}
                      color={selectedCategory === category ? 'primary' : 'default'}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: selectedCategory === category ? 'primary.dark' : 'grey.100',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <Fade in={isVisible} timeout={1400}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: 'primary.main'
                }}
              >
                {isPersian ? 'مقالات ویژه' : 'Featured Articles'}
              </Typography>
              <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                        }
                      }}
                      onClick={() => navigate(`/blogs/${post.slug}`)}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={post.image_url}
                          alt={post.title}
                        />
                        <Chip
                          label={isPersian ? 'ویژه' : 'Featured'}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: 'secondary.main',
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.excerpt}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                              <PersonIcon sx={{ fontSize: 14 }} />
                            </Avatar>
                            <Typography variant="body2" color="text.secondary">
                              {post.author}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {post.readTime} {isPersian ? 'دقیقه' : 'min'}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Regular Posts Grid */}
        <Fade in={isVisible} timeout={1600}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: 'text.primary'
              }}
            >
              {isPersian ? 'همه مقالات' : 'All Articles'}
            </Typography>
            <Grid container spacing={3}>
              {regularPosts.map((post) => (
                <Grid item xs={12} sm={6} lg={4} key={post.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={post.image_url}
                      alt={post.title}
                    />
                    <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                        {post.tags.slice(0, 2).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
                              height: 24,
                              borderColor: 'grey.300',
                            }}
                          />
                        ))}
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1.5,
                          lineHeight: 1.3,
                          fontSize: '1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          lineHeight: 1.5,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 20, height: 20, bgcolor: 'primary.main', fontSize: '0.7rem' }}>
                            {post.author.charAt(0)}
                          </Avatar>
                          <Typography variant="caption" color="text.secondary">
                            {post.author}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {post.readTime} {isPersian ? 'دقیقه' : 'min'}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Load More Button */}
        {regularPosts.length > 6 && (
          <Fade in={isVisible} timeout={1800}>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }
                }}
              >
                {isPersian ? 'بارگذاری بیشتر' : 'Load More'}
              </Button>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  )
}