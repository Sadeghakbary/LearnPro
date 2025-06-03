import { translate } from '@/localization'
import { AppBar, Container, Toolbar } from '@mui/material'
import { useState } from 'react'
import DesktopMenu from './DesktopMenu'
import Logo from './Logo'
import MobileMenu from './PhoneMenue'
import UserMenu from './UserMenu'
import ChangeTheme from './thme'
import ChangeLang from './LanguageBtn'

export default function ResponsiveAppBar() {
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
          <UserMenu
            settings={settings}
            anchorElUser={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
