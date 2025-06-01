
import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import configReducer from './slices/themeSlice'
import themeReducer from "./slices/themeSlice";


export const store = configureStore({
  reducer: {
    appConfigs: configReducer,
     theme: themeReducer,
   
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
