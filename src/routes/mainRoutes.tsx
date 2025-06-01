import { Routes, Route } from 'react-router-dom'
import ResponsiveAppBar from '@/pages/layout/Navbar/ResponsiveAppBar'
import HomePage from '@/pages/HomePage'
import CoursesPage from '@/pages/CoursePage'
import SettingsPage from  '@/pages/settingPage'

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<ResponsiveAppBar />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
