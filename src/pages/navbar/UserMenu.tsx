import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  settings: { title: string; path: string }[]
  anchorElUser: null | HTMLElement
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
}

export default function UserMenu({
  settings,
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}: Props) {
  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='User' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu} to={setting.path} component={Link}>
           {setting.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
