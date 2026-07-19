import { api } from './api'

export interface Comment {
    id?: string
    postId: string
    content: string
    parentId?: string | null
}

export interface CommentResponse {
    id: string
    content: string
    likes: number
    createdAt: string
    updatedAt?: string
    username: string
    userAvatar?: string
    parentId?: string
    replyCount?: number
    replies?: CommentResponse[]
}

export const commentService = {
    // 获取帖子的所有评论
    async getCommentsByPost(postId: string): Promise<CommentResponse[]> {
        const response = await api.get(`/qisoul/comment/post/${postId}`)
        return response.data.data
    },

    // 获取单条评论
    async getComment(id: string): Promise<CommentResponse> {
        const response = await api.get(`/qisoul/comment/${id}`)
        return response.data.data
    },

    // 创建评论
    async createComment(data: Comment): Promise<CommentResponse> {
        const response = await api.post('/qisoul/comment', data)
        return response.data.data
    },

    // 点赞评论
    async likeComment(id: string): Promise<{ likes: number }> {
        const response = await api.post(`/qisoul/comment/${id}/like`)
        return response.data
    },

    // 删除评论
    async deleteComment(id: string): Promise<void> {
        await api.delete(`/qisoul/comment/${id}`)
    },
}