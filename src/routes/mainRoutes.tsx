import { Routes, Route } from 'react-router-dom';
import CoursePage from '@/pages/CoursePage';
import MainPage from '@/pages/mainPage';
import SettingsPage from '@/pages/settingPage';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/courses/:slug" element={<CoursePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}