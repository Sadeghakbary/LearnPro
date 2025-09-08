import { Routes, Route } from 'react-router-dom';
import CourseDetailPage from '@/pages/courseDetailPage';
import MainPage from '@/pages/mainPage';
import SettingsPage from '@/pages/settingPage';
import BlogsPage from '@/pages/BlogsPage';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import CoursesPage from '@/pages/CoursesPage';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}