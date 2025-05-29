import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  token: string
}

const initialState: UserState = {
  token: localStorage.getItem('token') || '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
      window.location.reload()
    },
    doLogout: (state) => {
      state.token = ''
      localStorage.removeItem('token')
    },
    removeUserInfo: (state) => {
      state.token = ''
      localStorage.removeItem('token')
    },
  },
})

export const { doLogin, doLogout, removeUserInfo } = userSlice.actions

export const userInfo = (state: RootState) => state.userInfo

export default userSlice.reducer
