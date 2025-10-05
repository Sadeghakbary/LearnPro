import backImage from '@/assets/images/background/Grey Laptop Promo Poster.png'
import { lang, translate } from '@/localization'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Fade, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ResponsiveAppBar from './navbar/ResponsiveAppBar'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = searchTerm.trim().toLocaleLowerCase()
    const allRoutes = [...translate.navbar.Pages, ...translate.navbar.settings]
    const matched = allRoutes.find((item) => item.title.toLocaleLowerCase().includes(term))
    navigate(matched ? matched.path : '/not-found')
  }

  const isPersian = lang === 'fa'

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${backImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* Navbar positioned over the background image */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <ResponsiveAppBar />
      </Box>

      <Fade in={isVisible} timeout={1000}>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            maxWidth: 700,
            width: '100%',
            color: '#000',
            animation: 'slideUp 1s ease-out',
            '@keyframes slideUp': {
              from: { opacity: 0, transform: 'translateY(50px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {/* Main heading with gradient */}
          <Typography
            variant='h2'
            sx={{
              mb: 3,
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              lineHeight: 1.2,
            }}
          >
            {translate.pages.home.welcome}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant='h5'
            sx={{
              mb: 5,
              fontWeight: 400,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              opacity: 0.8,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            }}
          >
            {translate.pages.home.details}
          </Typography>

          {/* Enhanced search bar */}
          <Paper
            elevation={24}
            sx={{
              p: 1,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              maxWidth: 500,
              mx: 'auto',
              animation: 'scaleIn 0.8s ease-out 0.3s both',
              '@keyframes scaleIn': {
                from: { opacity: 0, transform: 'scale(0.9)' },
                to: { opacity: 1, transform: 'scale(1)' },
              },
            }}
          >
            <TextField
              fullWidth
              placeholder={translate.pages.home.Search}
              variant='standard'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiInput-root': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#333',
                  '&::before': { display: 'none' },
                  '&::after': { display: 'none' },
                },
                '& .MuiInput-input': {
                  py: 2,
                  px: 3,
                },
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                        boxShadow: '0 3px 15px rgba(33, 150, 243, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976d2 30%, #00bcd4 90%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 25px rgba(33, 150, 243, 0.6)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <SearchIcon sx={{ mr: isPersian ? 0 : 1, ml: isPersian ? 1 : 0 }} />
                      {isPersian ? 'جستجو' : 'Search'}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>

          {/* Additional info */}
          <Typography
            variant='body1'
            sx={{
              mt: 4,
              opacity: 0.9,
              fontSize: '1rem',
              fontWeight: 500,
              textShadow: '0 1px 2px rgba(255,255,255,0.7)',
              animation: 'fadeIn 1s ease-out 1s both',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 0.9 },
              },
            }}
          >
            {isPersian ? 'آموزش‌های با کیفیت در زمینه برنامه‌نویسی و فناوری' : 'Quality education in programming and technology'}
          </Typography>
        </Box>
      </Fade>
    </Box>
  )
}
