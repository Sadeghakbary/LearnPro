import { Routes, Route } from 'react-router-dom';
import CourseDetailPage from '@/pages/courseDetailPage';
import MainPage from '@/pages/mainPage';
import SettingsPage from '@/pages/settingPage';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}