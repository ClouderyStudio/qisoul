import { api } from './api'

export interface User {
    id: string
    username: string
    email: string
    avatar: string
}

export interface LoginResponse {
    success: boolean
    message: string
    user: User
}

export interface StatusResponse {
    success: boolean
    isAuthenticated: boolean
    user?: User
    message?: string
}

export const authService = {
    // OAuth2 回调登录
    async callback(code: string, redirectUri: string): Promise<LoginResponse> {
        const response = await api.post('/identity/auth/callback', {
            code,
            redirectUri,
        })
        return response.data
    },

    // 获取当前用户信息
    async getMe(): Promise<{ success: boolean; user?: User }> {
        const response = await api.get('/identity/auth/me')
        return response.data
    },

    // 检查登录状态
    async checkStatus(): Promise<StatusResponse> {
        const response = await api.get('/identity/auth/status')
        return response.data
    },

    // 登出
    async logout(): Promise<{ success: boolean; message: string }> {
        const response = await api.post('/identity/auth/logout')
        return response.data
    },
}