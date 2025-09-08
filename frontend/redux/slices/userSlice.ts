import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  token: string
  id?: number
  email?: string
  firstName?: string
  lastName?: string
  role?: string
}

const getInitialState = (): UserState => {
  const token = localStorage.getItem('token') || '';
  const userInfo = localStorage.getItem('userInfo');

  if (token && userInfo) {
    try {
      const parsedUserInfo = JSON.parse(userInfo);
      return {
        token,
        ...parsedUserInfo
      };
    } catch (error) {
      console.error('Error parsing user info from localStorage:', error);
    }
  }

  return { token };
};

const initialState: UserState = getInitialState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token
      state.id = action.payload.id
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.role = action.payload.role

      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('userInfo', JSON.stringify({
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        role: action.payload.role
      }))
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
