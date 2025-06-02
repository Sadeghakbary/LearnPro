import { translate } from '@/localization'
import { Box, Container, IconButton, InputBase, Typography  } from '@mui/material'
import {SearchIcon} from '@mui/icons-material'

export default function HomePage() {
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
      <Box
        display='flex'
        justifyContent='center'
        mt={4}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder='چی میخوای یاد بگیری؟' />
        <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  )
}
