import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  email: string
  avatar: string
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  // Getters
  const getUser = computed(() => user.value)
  const getIsAuthenticated = computed(() => isAuthenticated.value)
  const getUsername = computed(() => user.value?.username || '')
  const getAvatar = computed(() => user.value?.avatar || '')

  // Actions
  function setUser(userData: User) {
    user.value = userData
    isAuthenticated.value = true
    // 保存到 localStorage 以便刷新时恢复
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function clearUser() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  // 从 localStorage 恢复用户信息
  function restoreUser() {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const userData = JSON.parse(stored) as User
        user.value = userData
        isAuthenticated.value = true
        return true
      } catch {
        localStorage.removeItem('user')
        return false
      }
    }
    return false
  }

  // 登录
  async function login(code: string, redirectUri?: string) {
    loading.value = true
    try {
      const response = await fetch('/api/identity/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 重要：携带 Cookie
        body: JSON.stringify({
          code,
          redirectUri: redirectUri || `${window.location.origin}/callback`
        }),
      })

      const data = await response.json()

      if (data.success && data.user) {
        setUser(data.user)
        return { success: true, user: data.user }
      } else {
        throw new Error(data.message || '登录失败')
      }
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 登出
  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('登出请求失败:', error)
    } finally {
      clearUser()
      window.location.href = '/login'
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    loading,
    // Getters
    getUser,
    getIsAuthenticated,
    getUsername,
    getAvatar,
    // Actions
    setUser,
    clearUser,
    restoreUser,
    login,
    logout,
  }
})