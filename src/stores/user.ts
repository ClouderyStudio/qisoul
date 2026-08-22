import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type User } from '../services'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  const getUsername = computed(() => user.value?.username || '')
  const getAvatar = computed(() => user.value?.avatar || '')

  function setUser(userData: User) {
    user.value = userData
    isAuthenticated.value = true
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function clearUser() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

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

  // 登录（OAuth2 回调）
  async function login(code: string, redirectUri: string, state?: string) {
    loading.value = true
    try {
      const result = await authService.callback(code, redirectUri, state)
      if (result.success && result.user) {
        setUser(result.user)
        return { success: true, user: result.user }
      } else {
        throw new Error(result.message || '登录失败')
      }
    } catch (error: any) {
      console.error('登录失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 检查登录状态
  async function checkStatus() {
    try {
      const result = await authService.checkStatus()
      if (result.isAuthenticated && result.user) {
        setUser(result.user)
        return true
      } else {
        clearUser()
        return false
      }
    } catch {
      clearUser()
      return false
    }
  }

  // 登出
  async function logout() {
    try {
      await authService.logout()
    } catch (error) {
      console.error('登出请求失败:', error)
    } finally {
      clearUser()
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    getUsername,
    getAvatar,
    setUser,
    clearUser,
    restoreUser,
    login,
    checkStatus,
    logout,
  }
})