export const BASE_URL = 'http://localhost:5000/'

export const API = {
  Authentication: {
    Login: `${BASE_URL}api/auth/login`,
    Register: `${BASE_URL}api/auth/register`,
    Profile: `${BASE_URL}api/auth/profile`,
  },
  Courses: {
    GetAll: `${BASE_URL}api/courses`,
    GetById: (id: string) => `${BASE_URL}api/courses/${id}`,
    GetBySlug: (slug: string) => `${BASE_URL}api/courses/slug/${slug}`,
    Create: `${BASE_URL}api/courses`,
  },
  Admin: {
    Users: `${BASE_URL}api/admin/users`,
    UserById: (id: string) => `${BASE_URL}api/admin/users/${id}`,
    UpdateUserRole: (id: string) => `${BASE_URL}api/admin/users/${id}/role`,
    Stats: `${BASE_URL}api/admin/stats`,
  },
}
