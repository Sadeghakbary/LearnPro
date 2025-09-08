import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { lang } from '@/localization'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  Fade,
  InputAdornment,
  IconButton,
  Link,
  Divider
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google
} from '@mui/icons-material'
import { useAppDispatch } from '@/redux/store'
import { doLogin } from '@/redux/slices/userSlice'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isPersian = lang === 'fa'

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful login
      const mockToken = 'mock-jwt-token-' + Date.now()
      dispatch(doLogin({ token: mockToken }))

      setSuccess(true)
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 1000)

    } catch {
      setError(isPersian ? 'ایمیل یا رمز عبور اشتباه است' : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Mock Google login
    const mockToken = 'google-jwt-token-' + Date.now()
    dispatch(doLogin({ token: mockToken }))
    navigate(from, { replace: true })
  }

  if (success) {
    return (
      <Container maxWidth="sm">
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}>
          <Fade in={success}>
            <Alert
              severity="success"
              sx={{
                borderRadius: 3,
                p: 3,
                fontSize: '1.1rem',
                textAlign: 'center'
              }}
            >
              {isPersian ? 'ورود با موفقیت انجام شد!' : 'Login successful!'}
            </Alert>
          </Fade>
        </Box>
      </Container>
    )
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)'
        }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              {isPersian ? 'ورود به حساب کاربری' : 'Welcome Back'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isPersian ? 'برای دسترسی به دوره‌ها وارد حساب خود شوید' : 'Sign in to access your courses'}
            </Typography>
          </Box>

          {/* Error Message */}
          <Fade in={!!error}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          </Fade>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={isPersian ? 'ایمیل' : 'Email'}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label={isPersian ? 'رمز عبور' : 'Password'}
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(102, 126, 234, 0.5)',
                },
                transition: 'all 0.3s ease',
                mb: 2
              }}
            >
              {loading ? (isPersian ? 'در حال ورود...' : 'Signing in...') : (isPersian ? 'ورود' : 'Sign In')}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {isPersian ? 'یا' : 'or'}
            </Typography>
          </Divider>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{
              py: 1.5,
              borderRadius: 2,
              borderColor: '#ddd',
              color: '#333',
              '&:hover': {
                borderColor: '#ccc',
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease',
              mb: 3
            }}
            startIcon={<Google />}
          >
            {isPersian ? 'ورود با گوگل' : 'Continue with Google'}
          </Button>

          {/* Links */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {isPersian ? 'حساب کاربری ندارید؟' : "Don't have an account?"}{' '}
              <Link
                href="#"
                sx={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {isPersian ? 'ثبت نام کنید' : 'Sign up'}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <Link
                href="#"
                sx={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {isPersian ? 'رمز عبور را فراموش کرده‌اید؟' : 'Forgot password?'}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}