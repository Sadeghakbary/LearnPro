import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/store'
import { userInfo } from '@/redux/slices/userSlice'
import { lang } from '@/localization'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Avatar
} from '@mui/material'
import {
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Edit as EditIcon
} from '@mui/icons-material'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
  is_active: boolean
  created_at: string
  last_login: string
}

interface AdminStats {
  totalUsers: number
  adminUsers: number
  regularUsers: number
  activeUsers: number
}

export default function AdminPage() {
  const navigate = useNavigate()
  const user = useAppSelector(userInfo)
  const isPersian = lang === 'fa'

  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState('')

  // Check if user is admin
  useEffect(() => {
    if (!user.token) {
      navigate('/login')
      return
    }

    if (user.role !== 'admin') {
      navigate('/')
      return
    }

    fetchUsers()
    fetchStats()
  }, [user, navigate, fetchUsers, fetchStats])

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(isPersian ? 'خطا در بارگذاری کاربران' : 'Error loading users')
      console.error('Fetch users error:', err)
    }
  }, [user.token, isPersian])

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }

      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      console.error('Fetch stats error:', err)
    } finally {
      setLoading(false)
    }
  }, [user.token])

  const handleRoleChange = async () => {
    if (!selectedUser) return

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ role: newRole })
      })

      if (!response.ok) {
        throw new Error('Failed to update user role')
      }

      // Update user in local state
      setUsers(users.map(u =>
        u.id === selectedUser.id ? { ...u, role: newRole } : u
      ))

      setRoleDialogOpen(false)
      setSelectedUser(null)
      setNewRole('')
    } catch (err) {
      setError(isPersian ? 'خطا در بروزرسانی نقش کاربر' : 'Error updating user role')
      console.error('Update role error:', err)
    }
  }

  const openRoleDialog = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setRoleDialogOpen(true)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        {isPersian ? 'پنل مدیریت' : 'Admin Panel'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.totalUsers}
                    </Typography>
                    <Typography variant="body2">
                      {isPersian ? 'کل کاربران' : 'Total Users'}
                    </Typography>
                  </Box>
                  <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.adminUsers}
                    </Typography>
                    <Typography variant="body2">
                      {isPersian ? 'مدیران' : 'Admins'}
                    </Typography>
                  </Box>
                  <AdminIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.regularUsers}
                    </Typography>
                    <Typography variant="body2">
                      {isPersian ? 'کاربران عادی' : 'Regular Users'}
                    </Typography>
                  </Box>
                  <PersonIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stats.activeUsers}
                    </Typography>
                    <Typography variant="body2">
                      {isPersian ? 'کاربران فعال' : 'Active Users'}
                    </Typography>
                  </Box>
                  <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Users Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          {isPersian ? 'مدیریت کاربران' : 'User Management'}
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{isPersian ? 'کاربر' : 'User'}</TableCell>
                <TableCell>{isPersian ? 'ایمیل' : 'Email'}</TableCell>
                <TableCell>{isPersian ? 'نقش' : 'Role'}</TableCell>
                <TableCell>{isPersian ? 'وضعیت' : 'Status'}</TableCell>
                <TableCell>{isPersian ? 'تاریخ عضویت' : 'Join Date'}</TableCell>
                <TableCell>{isPersian ? 'آخرین ورود' : 'Last Login'}</TableCell>
                <TableCell>{isPersian ? 'عملیات' : 'Actions'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar>
                        {user.first_name?.[0] || user.email[0].toUpperCase()}
                      </Avatar>
                      <Typography>
                        {user.first_name} {user.last_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role === 'admin' ? (isPersian ? 'مدیر' : 'Admin') : (isPersian ? 'کاربر' : 'User')}
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_active ? (isPersian ? 'فعال' : 'Active') : (isPersian ? 'غیرفعال' : 'Inactive')}
                      color={user.is_active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString(isPersian ? 'fa-IR' : 'en-US')}
                  </TableCell>
                  <TableCell>
                    {user.last_login
                      ? new Date(user.last_login).toLocaleDateString(isPersian ? 'fa-IR' : 'en-US')
                      : (isPersian ? 'هرگز' : 'Never')
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => openRoleDialog(user)}
                    >
                      {isPersian ? 'تغییر نقش' : 'Change Role'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Role Change Dialog */}
      <Dialog open={roleDialogOpen} onClose={() => setRoleDialogOpen(false)}>
        <DialogTitle>
          {isPersian ? 'تغییر نقش کاربر' : 'Change User Role'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" mb={2}>
            {isPersian ? 'کاربر:' : 'User:'} {selectedUser?.email}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>{isPersian ? 'نقش جدید' : 'New Role'}</InputLabel>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              label={isPersian ? 'نقش جدید' : 'New Role'}
            >
              <MenuItem value="user">{isPersian ? 'کاربر' : 'User'}</MenuItem>
              <MenuItem value="admin">{isPersian ? 'مدیر' : 'Admin'}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleDialogOpen(false)}>
            {isPersian ? 'لغو' : 'Cancel'}
          </Button>
          <Button onClick={handleRoleChange} variant="contained">
            {isPersian ? 'ذخیره' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}