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

export interface OAuthStateResponse {
    success: boolean
    state: string
}

export const authService = {
    // 获取 OAuth state（服务端会同时种入 HttpOnly Cookie，供回调时校验防 CSRF 登录）
    async getOAuthState(): Promise<OAuthStateResponse> {
        const response = await api.get('/identity/auth/state')
        return response.data
    },

    // OAuth2 回调登录
    async callback(code: string, redirectUri: string, state?: string): Promise<LoginResponse> {
        const response = await api.post('/identity/auth/callback', {
            code,
            redirectUri,
            // state 由登录发起时从服务端获取（/identity/auth/state），
            // 回调时带上，后端与 Cookie 比对；缺省时后端兼容放行
            state,
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