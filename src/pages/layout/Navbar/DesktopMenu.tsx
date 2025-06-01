import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  pages: { Title: string; path: string }[]
  handleCloseNavMenu: () => void
}

export default function DesktopMenu({ pages, handleCloseNavMenu }: Props) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page, index) => (
        <Button
          key={index}
          component={Link}
          to={page.path}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page.Title}
        </Button>
      ))}
    </Box>
  )
}
