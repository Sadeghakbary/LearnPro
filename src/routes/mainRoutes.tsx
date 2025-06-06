import MainPage from '@/pages/mainPage'
import CoursesPage from '@/pages/coursePage'
import SettingsPage from '@/pages/settingPage'
import { Route, Routes } from 'react-router-dom'
export default function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<MainPage />} />
        <Route path='/courses' element={<CoursesPage />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
