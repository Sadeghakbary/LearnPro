import { Box, Typography } from '@mui/material'
import logo from '@/assets/images/logo/learnPro.jpg.jpg'
import { translate } from '@/localization'

export default function Logo() {
  return (
    <>
      {/* دسکتاپ */}
      <Box
        component='img'
        src={logo}
        alt='LearnPro Logo'
        sx={{
          display: { xs: 'none', md: 'flex' },
          height: 40,
          width: 45,
          mr: 2,
          borderRadius: 15,
        }}
      />
      <Typography
        variant='h6'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {translate.common.app_name}
      </Typography>

      {/* موبایل */}
      <Box
        component='img'
        src={logo}
        alt='LearnPro Logo'
        sx={{
          display: { xs: 'flex', md: 'none' },
          height: 40,
          mr: 2,
          borderRadius: 15,
          width: 50,
        }}
      />
      <Typography
        variant='h5'
        noWrap
        component='a'
        href='/'
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {translate.common.app_name}
      </Typography>
    </>
  )
}
