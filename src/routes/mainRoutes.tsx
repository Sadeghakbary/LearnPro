import CoursesPage from '@/pages/CoursePage'
import HomePage from '@/pages/HomePage'
import SettingsPage from '@/pages/settingPage'
import { Route, Routes } from 'react-router-dom'

export default function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
