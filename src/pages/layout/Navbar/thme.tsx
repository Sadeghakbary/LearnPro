import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '@/redux/slices/themeSlice'
import { RootState } from '@/redux/store'

const ChangeTheme = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <button onClick={() => dispatch(changeTheme())}>
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default ChangeTheme ;
