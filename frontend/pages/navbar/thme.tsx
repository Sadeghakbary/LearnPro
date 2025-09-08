import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '@/redux/slices/themeSlice'
import { RootState } from '@/redux/store'

import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const ChangeTheme = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <IconButton onClick={() => dispatch(changeTheme())}>
      {mode === 'light' ? (
        <DarkModeIcon sx={{ color: '#757575' }} />
      ) : (
        <LightModeIcon sx={{ color: '#FFD700' }} />
      )}
    </IconButton>
  )
}
export default ChangeTheme
