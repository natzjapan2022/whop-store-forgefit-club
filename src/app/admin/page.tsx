'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  Settings,
  LogOut,
  Users,
  Database,
  Eye,
  X,
  Save,
  Calendar,
  Mail,
  User,
  ChevronDown,
  FileText
} from 'lucide-react'
import { User as UserType, Column, FormData } from '@/types'
import { generateId, validateEmail, formatDate } from '@/lib/utils'
import Logo from '@/components/Logo'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<UserType[]>([])
  const [columns, setColumns] = useState<Column[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isColumnsModalOpen, setIsColumnsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState<FormData>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Default columns
  const defaultColumns: Column[] = [
    { id: 'name', name: 'Name', type: 'text', required: true },
    { id: 'email', name: 'Email', type: 'email', required: true },
    { id: 'datePurchased', name: 'Date Purchased', type: 'date', required: true },
    { id: 'status', name: 'Status', type: 'select', required: true, options: ['Active', 'Inactive', 'Pending'] }
  ]

  useEffect(() => {
    checkAuthentication()
    loadData()
  }, [])

  const checkAuthentication = () => {
    const session = localStorage.getItem('admin_session')
    if (session) {
      try {
        const parsed = JSON.parse(session)
        const now = Date.now()
        const isValid = parsed.authenticated && (now - parsed.timestamp < parsed.expiresIn)

        if (isValid) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('admin_session')
          router.push('/admin/login')
        }
      } catch {
        localStorage.removeItem('admin_session')
        router.push('/admin/login')
      }
    } else {
      router.push('/admin/login')
    }
    setIsLoading(false)
  }

  const loadData = () => {
    // Load users
    const savedUsers = localStorage.getItem('admin_users')
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers))
      } catch {
        setUsers([])
      }
    }

    // Load columns
    const savedColumns = localStorage.getItem('admin_columns')
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns))
      } catch {
        setColumns(defaultColumns)
      }
    } else {
      setColumns(defaultColumns)
    }
  }

  const saveUsers = (newUsers: UserType[]) => {
    setUsers(newUsers)
    localStorage.setItem('admin_users', JSON.stringify(newUsers))
  }

  const saveColumns = (newColumns: Column[]) => {
    setColumns(newColumns)
    localStorage.setItem('admin_columns', JSON.stringify(newColumns))
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin/login')
  }

  const handleAddUser = () => {
    const newFormData: FormData = {}
    columns.forEach(column => {
      newFormData[column.id] = column.type === 'select' ? (column.options?.[0] || '') : ''
    })
    setFormData(newFormData)
    setErrors({})
    setIsAddModalOpen(true)
  }

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user)
    setFormData({ ...user })
    setErrors({})
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const newUsers = users.filter(user => user.id !== userId)
      saveUsers(newUsers)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    columns.forEach(column => {
      const value = formData[column.id]

      if (column.required && (!value || String(value).trim() === '')) {
        newErrors[column.id] = `${column.name} is required`
      } else if (column.type === 'email' && value && !validateEmail(String(value))) {
        newErrors[column.id] = 'Please enter a valid email'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveUser = () => {
    if (!validateForm()) return

    const userData = { ...formData } as UserType

    if (selectedUser) {
      // Edit existing user
      const newUsers = users.map(user =>
        user.id === selectedUser.id ? { ...userData, id: selectedUser.id } : user
      )
      saveUsers(newUsers)
      setIsEditModalOpen(false)
    } else {
      // Add new user
      const newUser: UserType = {
        ...userData,
        id: generateId()
      }
      saveUsers([...users, newUser])
      setIsAddModalOpen(false)
    }

    setSelectedUser(null)
    setFormData({})
  }

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      name: 'New Column',
      type: 'text',
      required: false
    }
    saveColumns([...columns, newColumn])
  }

  const handleUpdateColumn = (columnId: string, updates: Partial<Column>) => {
    const newColumns = columns.map(col =>
      col.id === columnId ? { ...col, ...updates } : col
    )
    saveColumns(newColumns)
  }

  const handleDeleteColumn = (columnId: string) => {
    if (defaultColumns.some(col => col.id === columnId)) {
      alert('Cannot delete default columns')
      return
    }

    if (confirm('Are you sure you want to delete this column? This will remove the data from all users.')) {
      const newColumns = columns.filter(col => col.id !== columnId)
      saveColumns(newColumns)

      // Remove column data from users
      const newUsers = users.map(user => {
        const { [columnId]: removed, ...rest } = user
        return rest as UserType
      })
      saveUsers(newUsers)
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(users, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'forgefit-users.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const renderFormField = (column: Column) => {
    const value = formData[column.id] || ''
    const hasError = errors[column.id]

    switch (column.type) {
      case 'select':
        return (
          <div className="relative">
            <select
              value={String(value)}
              onChange={(e) => setFormData(prev => ({ ...prev, [column.id]: e.target.value }))}
              className={`w-full p-3 bg-gray-800 border ${hasError ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none pr-10`}
            >
              {column.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        )
      case 'textarea':
        return (
          <textarea
            value={String(value)}
            onChange={(e) => setFormData(prev => ({ ...prev, [column.id]: e.target.value }))}
            className={`w-full p-3 bg-gray-800 border ${hasError ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none`}
            rows={3}
            placeholder={`Enter ${column.name.toLowerCase()}`}
          />
        )
      default:
        return (
          <input
            type={column.type}
            value={String(value)}
            onChange={(e) => setFormData(prev => ({ ...prev, [column.id]: e.target.value }))}
            className={`w-full p-3 bg-gray-800 border ${hasError ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder={`Enter ${column.name.toLowerCase()}`}
          />
        )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo showText={false} />
              <div>
                <h1 className="text-xl font-bold text-white">ForgeFit Admin</h1>
                <p className="text-gray-400 text-sm">User Management Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-400 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-400 text-sm">Data Columns</p>
                <p className="text-2xl font-bold text-white">{columns.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddUser}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add User</span>
            </button>
            <button
              onClick={() => setIsColumnsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Manage Columns</span>
            </button>
            <button
              onClick={exportData}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  {columns.map(column => (
                    <th key={column.id} className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      {column.name}
                      {column.required && <span className="text-red-500 ml-1">*</span>}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400">
                      {searchTerm ? 'No users found matching your search.' : 'No users yet. Add your first user to get started.'}
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                      {columns.map(column => (
                        <td key={column.id} className="px-6 py-4 text-sm text-gray-300">
                          {column.type === 'date' && user[column.id]
                            ? formatDate(String(user[column.id]))
                            : String(user[column.id] || '')
                          }
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Add New User</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {columns.map(column => (
                <div key={column.id}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {column.name}
                    {column.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderFormField(column)}
                  {errors[column.id] && (
                    <p className="mt-1 text-sm text-red-500">{errors[column.id]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-800">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {columns.map(column => (
                <div key={column.id}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {column.name}
                    {column.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderFormField(column)}
                  {errors[column.id] && (
                    <p className="mt-1 text-sm text-red-500">{errors[column.id]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-800">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Columns Modal */}
      {isColumnsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Manage Columns</h2>
              <button
                onClick={() => setIsColumnsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {columns.map(column => (
                  <div key={column.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          value={column.name}
                          onChange={(e) => handleUpdateColumn(column.id, { name: e.target.value })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                        <select
                          value={column.type}
                          onChange={(e) => handleUpdateColumn(column.id, { type: e.target.value as Column['type'] })}
                          disabled={defaultColumns.some(col => col.id === column.id)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="date">Date</option>
                          <option value="select">Select</option>
                          <option value="textarea">Textarea</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={column.required}
                            onChange={(e) => handleUpdateColumn(column.id, { required: e.target.checked })}
                            disabled={defaultColumns.some(col => col.id === column.id)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-300">Required</span>
                        </label>
                        {!defaultColumns.some(col => col.id === column.id) && (
                          <button
                            onClick={() => handleDeleteColumn(column.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    {column.type === 'select' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Options (comma-separated)</label>
                        <input
                          type="text"
                          value={column.options?.join(', ') || ''}
                          onChange={(e) => handleUpdateColumn(column.id, {
                            options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                          })}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddColumn}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Column</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}