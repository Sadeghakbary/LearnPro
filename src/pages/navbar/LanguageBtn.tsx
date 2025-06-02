import LanguageIcon from '@mui/icons-material/Language'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { changeLanguage } from '@/localization'

export default function ChangeLang() {
  return (
    <Tooltip title="تغییر زبان">
      <IconButton onClick={changeLanguage} color="inherit">
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  )
}
