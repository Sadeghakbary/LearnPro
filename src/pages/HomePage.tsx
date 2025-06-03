import { translate } from '@/localization'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
   const term = searchTerm.trim().toLocaleLowerCase()
   const allRoutes = [...translate.navbar.Pages ,...translate.navbar.settings ,]

   const matched = allRoutes.find((item) =>
    item.title.toLocaleLowerCase().includes(term)
   )
   if(matched){
    navigate(matched.path)
   }else{
    navigate('/not-found')
   }
  }
  return (
    <>
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant='h4' color='primary'>
          {translate.pages.home.welcome}
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          {translate.pages.home.Details}
        </Typography>
      </Container>
      <Container maxWidth='sm'>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            mt: 12,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TextField
            fullWidth
            placeholder = {translate.pages.home.Search}
            variant='outlined'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>
    </>
  )
}
