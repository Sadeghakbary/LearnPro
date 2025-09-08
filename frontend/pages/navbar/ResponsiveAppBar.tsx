import { translate } from '@/localization'
import { AppBar, Container, Toolbar, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/store'
import { userInfo } from '@/redux/slices/userSlice'
import DesktopMenu from './DesktopMenu'
import Logo from './Logo'
import MobileMenu from './PhoneMenue'
import UserMenu from './UserMenu'
import ChangeTheme from './thme'
import ChangeLang from './LanguageBtn'
import { Login as LoginIcon } from '@mui/icons-material'

export default function ResponsiveAppBar() {
  const navigate = useNavigate()
  const user = useAppSelector(userInfo)
  const isAuthenticated = !!user.token

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const pages = translate.navbar.Pages
  const settings = translate.navbar.settings

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleCloseUserMenu = () => setAnchorElUser(null)

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MobileMenu
            pages={pages}
            anchorElNav={anchorElNav}
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
          />
          <Logo />
          <DesktopMenu pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
          <ChangeTheme/>
          <ChangeLang/>
          {isAuthenticated ? (
            <UserMenu
              settings={settings}
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
              sx={{
                ml: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              {translate.navbar.Pages.find(p => p.path === '/login')?.title || 'Login'}
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
