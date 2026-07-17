import { api } from './api'

export interface Sticky {
    id?: string
    content: string
    icon?: string
    color?: string
}

export interface StickyResponse {
    id: string
    content: string
    icon?: string
    color?: string
    likes: number
    createdAt: string
    username: string
    userAvatar?: string
}

export const stickyService = {
    // 获取便签列表
    async getStickies(limit: number = 20): Promise<StickyResponse[]> {
        const response = await api.get(`/qisoul/sticky?limit=${limit}`)
        return response.data.data
    },

    // 创建便签
    async createSticky(data: Sticky): Promise<StickyResponse> {
        const response = await api.post('/qisoul/sticky', data)
        return response.data.data
    },

    // 点赞便签
    async likeSticky(id: string): Promise<{ likes: number }> {
        const response = await api.post(`/qisoul/sticky/${id}/like`)
        return response.data
    },

    // 删除便签
    async deleteSticky(id: string): Promise<void> {
        await api.delete(`/qisoul/sticky/${id}`)
    },
}