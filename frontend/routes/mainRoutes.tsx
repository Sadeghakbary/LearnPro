import { Routes, Route } from 'react-router-dom';
import CourseDetailPage from '@/pages/courseDetailPage';
import MainPage from '@/pages/mainPage';
import SettingsPage from '@/pages/settingPage';
import BlogsPage from '@/pages/BlogsPage';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import CoursesPage from '@/pages/CoursesPage';
import Layout from '@/componants/Layout';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
      <Route path="/courses/:slug" element={<Layout><CourseDetailPage /></Layout>} />
      <Route path="/blogs" element={<Layout><BlogsPage /></Layout>} />
      <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
    </Routes>
  );
}