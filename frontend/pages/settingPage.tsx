
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lang } from '@/localization'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Alert,
  Fade,
  Stack
} from '@mui/material'
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { selectTheme, changeTheme } from '@/redux/slices/themeSlice'

export default function SettingPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector(selectTheme)
  const isPersian = lang === 'fa'

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  })

  const [profile, setProfile] = useState({
    name: 'کاربر',
    email: 'user@example.com',
    bio: 'توضیحات پروفایل'
  })

  const [language, setLanguage] = useState(lang)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // Here you would typically save to backend
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 4
    }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { backgroundColor: 'white' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {isPersian ? 'تنظیمات' : 'Settings'}
          </Typography>
        </Box>

        {/* Success Message */}
        <Fade in={showSuccess}>
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': { fontWeight: 500 }
            }}
          >
            {isPersian ? 'تنظیمات با موفقیت ذخیره شد!' : 'Settings saved successfully!'}
          </Alert>
        </Fade>

        <Grid container spacing={3}>
          {/* Profile Settings */}
          <Grid item xs={12} md={8}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'visible'
            }}>
              <CardContent sx={{ p: 0 }}>
                {/* Profile Header */}
                <Box sx={{
                  background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                  p: 3,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Avatar sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    border: '3px solid white'
                  }}>
                    <PersonIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {profile.name || (isPersian ? 'کاربر' : 'User')}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {isPersian ? 'مدیریت پروفایل و تنظیمات حساب' : 'Manage profile and account settings'}
                    </Typography>
                  </Box>
                </Box>

                {/* Profile Form */}
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} mb={3} color="primary">
                    {isPersian ? 'اطلاعات پروفایل' : 'Profile Information'}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={isPersian ? 'نام کامل' : 'Full Name'}
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={isPersian ? 'ایمیل' : 'Email'}
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={isPersian ? 'بیوگرافی' : 'Bio'}
                        multiline
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        variant="outlined"
                        placeholder={isPersian ? 'درباره خودتان بنویسید...' : 'Tell us about yourself...'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Settings Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Theme Toggle */}
              <Paper sx={{
                p: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PaletteIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {isPersian ? 'تم' : 'Theme'}
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mode === 'dark'}
                      onChange={() => dispatch(changeTheme())}
                      color="primary"
                    />
                  }
                  label={mode === 'dark' ? (isPersian ? 'تم تاریک' : 'Dark Theme') : (isPersian ? 'تم روشن' : 'Light Theme')}
                />
              </Paper>

              {/* Language Settings */}
              <Paper sx={{
                p: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LanguageIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {isPersian ? 'زبان' : 'Language'}
                  </Typography>
                </Box>
                <FormControl fullWidth size="small">
                  <InputLabel>{isPersian ? 'انتخاب زبان' : 'Select Language'}</InputLabel>
                  <Select
                    value={language}
                    label={isPersian ? 'انتخاب زبان' : 'Select Language'}
                    onChange={(e) => setLanguage(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fa">فارسی</MenuItem>
                  </Select>
                </FormControl>
              </Paper>

              {/* Notifications */}
              <Paper sx={{
                p: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <NotificationsIcon color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {isPersian ? 'اعلان‌ها' : 'Notifications'}
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        color="primary"
                        size="small"
                      />
                    }
                    label={isPersian ? 'ایمیل' : 'Email'}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        color="primary"
                        size="small"
                      />
                    }
                    label={isPersian ? 'اعلان‌های مرورگر' : 'Push Notifications'}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        color="primary"
                        size="small"
                      />
                    }
                    label={isPersian ? 'پیامک' : 'SMS'}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            startIcon={<SaveIcon />}
            sx={{
              borderRadius: 3,
              px: 6,
              py: 1.5,
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 30%, #00bcd4 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(33, 150, 243, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isPersian ? 'ذخیره تنظیمات' : 'Save Settings'}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
