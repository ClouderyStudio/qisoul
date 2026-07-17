import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7288'

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 重要：携带 Cookie
})

// 响应拦截器 - 统一处理错误
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 未登录，可以触发跳转到登录页
            console.warn('未登录，请重新登录')
        }
        return Promise.reject(error)
    }
)