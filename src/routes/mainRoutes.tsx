import MainPage from '@/pages/mainPage'
import CourseDetailPage from '@/pages/CoursePage'
import SettingsPage from '@/pages/settingPage'
import { Route, Routes } from 'react-router-dom'
export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/courses/:slug' element={<CourseDetailPage />} />
      <Route path='/settings' element={<SettingsPage />} />
    </Routes>
  )
}
