import { translate } from '@/localization';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/redux/store';
import { userInfo } from '@/redux/slices/userSlice';
import { AdminPanelSettings as AdminIcon } from '@mui/icons-material';

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
  const user = useAppSelector(userInfo)
  const isAdmin = user.role === 'admin'

  return (
    <>
      <Tooltip title={translate.navbar.tooltip}>
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
        {isAdmin && (
          <>
            <MenuItem onClick={handleCloseUserMenu} to="/admin" component={Link}>
              <AdminIcon sx={{ mr: 1 }} />
              Admin Panel
            </MenuItem>
            <Divider />
          </>
        )}
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu} to={setting.path} component={Link}>
           {setting.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
