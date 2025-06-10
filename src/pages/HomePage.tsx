import backImage from '@/assets/images/background/Grey Laptop Promo Poster.png'
import { translate } from '@/localization'
import SearchIcon from '@mui/icons-material/Search'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = searchTerm.trim().toLocaleLowerCase()
    const allRoutes = [...translate.navbar.Pages, ...translate.navbar.settings]
    const matched = allRoutes.find((item) => item.title.toLocaleLowerCase().includes(term))
    navigate(matched ? matched.path : '/not-found')
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${backImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      />
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          color: '#fff',
        }}
      >
        <Typography variant='h3' sx={{ mb: 2 }}>
          {translate.pages.home.welcome}
        </Typography>
        <Typography variant='h6' sx={{ mb: 4 }}>
          {translate.pages.home.details}
        </Typography>

        <TextField
          fullWidth
          placeholder={translate.pages.home.Search}
          variant='outlined'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: '#fff',
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  )
}
