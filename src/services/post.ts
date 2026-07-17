import { api } from './api'

export interface Post {
    id?: string
    title: string
    content: string
    category: string
    icon?: string
}

export interface PostResponse {
    id: string
    title: string
    content: string
    category: string
    icon?: string
    likes: number
    comments: number
    createdAt: string
    username: string
    userAvatar?: string
}

export interface Category {
    value: string
    label: string
    icon: string
}

export interface PostListResponse {
    success: boolean
    data: PostResponse[]
    pagination: {
        page: number
        pageSize: number
        total: number
        totalPages: number
    }
}

export interface UpdatePostData {
    title: string
    content: string
    category: string
    icon?: string
}

export const postService = {
    // 获取帖子列表
    async getPosts(category?: string, page: number = 1, pageSize: number = 20): Promise<PostListResponse> {
        const params = new URLSearchParams()
        if (category && category !== 'all') params.append('category', category)
        params.append('page', page.toString())
        params.append('pageSize', pageSize.toString())

        const response = await api.get(`/qisoul/post?${params.toString()}`)
        return response.data
    },

    // 获取帖子分类列表
    async getCategories(): Promise<Category[]> {
        const response = await api.get('/qisoul/post/categories')
        return response.data.data
    },

    // 获取单篇帖子
    async getPost(id: string): Promise<PostResponse> {
        const response = await api.get(`/qisoul/post/${id}`)
        return response.data.data
    },

    // 创建帖子
    async createPost(data: Post): Promise<PostResponse> {
        const response = await api.post('/qisoul/post', data)
        return response.data.data
    },

    // 点赞帖子
    async likePost(id: string): Promise<{ likes: number }> {
        const response = await api.post(`/qisoul/post/${id}/like`)
        return response.data
    },

    // 删除帖子
    async deletePost(id: string): Promise<void> {
        await api.delete(`/qisoul/post/${id}`)
    },

    async updatePost(id: string, data: UpdatePostData): Promise<PostResponse> {
        const response = await api.put(`/qisoul/post/${id}`, data)
        return response.data.data
    },
}