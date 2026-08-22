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
        const status = error.response?.status
        const serverMsg = error.response?.data?.message as string | undefined

        if (status === 401) {
            // 未登录，可以触发跳转到登录页
            console.warn('未登录，请重新登录')
        } else if (status === 403) {
            // 例如 CSRF Origin 校验拒绝（跨站请求被拒绝）
            console.warn(serverMsg || '请求被拒绝')
        }

        // 透传服务端错误消息，便于调用方展示真实原因
        if (serverMsg) {
            error.message = serverMsg
        }

        return Promise.reject(error)
    }
)