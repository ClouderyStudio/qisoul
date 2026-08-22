import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
    console.error('[栖所] 未配置 VITE_API_BASE_URL：API 请求将发往同源路径，请在部署环境注入后端地址（生产环境不要回退到 localhost）')
}

export const api = axios.create({
    baseURL: API_BASE_URL || '/',
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
            // 会话失效：清除本地缓存并跳转登录页（登录/回调页自身不跳转，避免死循环）
            localStorage.removeItem('user')
            const { pathname, search } = window.location
            if (pathname !== '/login' && pathname !== '/callback') {
                window.location.assign(
                    '/login?redirect=' + encodeURIComponent(pathname + search),
                )
            }
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