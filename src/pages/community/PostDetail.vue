<template>
    <div class="pt-20 pb-8">
        <div class="max-w-3xl mx-auto px-6">
            <!-- 加载状态 -->
            <div v-if="loading" class="text-center py-16">
                <div class="w-10 h-10 border-2 border-t-warm-500 border-warm-200 rounded-full animate-spin mx-auto">
                </div>
                <p class="text-sm font-light mt-4" style="color: #8a7e74;">加载中...</p>
            </div>

            <!-- 帖子详情 -->
            <div v-else-if="post" class="p-8 rounded-[2.5rem]"
                style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;">
                <!-- 返回按钮 -->
                <button @click="goBack" class="text-sm font-light transition-colors flex items-center gap-2 mb-6"
                    style="color: #8a7e74;" @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                    @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                    ← 返回
                </button>

                <!-- 帖子内容 -->
                <div class="flex items-center gap-3 mb-4">
                    <span class="text-2xl">{{ post.icon || '📖' }}</span>
                    <h1 class="text-2xl font-light tracking-wide" style="color: #4f4842;">{{ post.title }}</h1>
                    <span class="px-2 py-0.5 text-[10px] rounded-full"
                        style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0; flex-shrink: 0;">{{
                            post.category }}</span>
                </div>

                <div class="flex items-center gap-4 mb-6 text-xs font-light" style="color: #8a7e74;">
                    <span>👤 {{ post.username || '匿名用户' }}</span>
                    <span>{{ formatTime(post.createdAt) }}</span>
                </div>

                <div class="text-sm font-light leading-relaxed whitespace-pre-line" style="color: #4b423c;">
                    {{ post.content }}
                </div>

                <div class="flex items-center gap-6 mt-6 pt-4" style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                    <button @click="likePost" class="text-sm font-light transition-colors flex items-center gap-2"
                        style="color: #8a7e74;" @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                        @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                        💛 {{ post.likes }}
                    </button>
                    <span class="text-sm font-light" style="color: #8a7e74;">💬 {{ post.comments || 0 }}</span>

                    <!-- ✅ 删除按钮（仅自己的帖子） -->
                    <button v-if="isMyPost" @click="confirmDelete"
                        class="text-sm font-light transition-colors flex items-center gap-1 ml-auto"
                        style="color: #b8aa98;" @mouseenter="e => e.currentTarget.style.color = '#e85a65'"
                        @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">
                        🗑️ 删除
                    </button>
                </div>
            </div>

            <!-- 错误状态 -->
            <div v-else class="text-center py-16"
                style="background: rgba(255, 250, 245, 0.3); border-radius: 3rem; border: 1px dashed #e7dbd0;">
                <div class="text-5xl mb-4">📭</div>
                <p class="text-sm font-light" style="color: #8a7e74;">帖子不存在或已被删除</p>
                <button @click="goBack" class="mt-4 px-6 py-2 text-sm font-light transition-all rounded-full"
                    style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                    @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                    @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                    返回社区
                </button>
            </div>
        </div>

        <!-- ====== 删除确认弹窗 ====== -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center px-4"
            style="background: rgba(44, 36, 28, 0.3); backdrop-filter: blur(4px);">
            <div class="w-full max-w-sm p-6 rounded-[2.5rem] text-center"
                style="background: rgba(255, 250, 245, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(230, 215, 200, 0.3); box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);">
                <div class="text-4xl mb-4">🗑️</div>
                <h3 class="text-lg font-light tracking-wide" style="color: #4f4842;">确认删除</h3>
                <p class="text-sm font-light mt-2" style="color: #6d6259;">确定要删除这篇帖子吗？此操作不可撤销。</p>
                <div class="flex gap-3 mt-6">
                    <button @click="deletePost" class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #e85a65; color: white; border: 1px solid #e85a65;"
                        @mouseenter="e => e.currentTarget.style.background = '#cc404a'"
                        @mouseleave="e => e.currentTarget.style.background = '#e85a65'">
                        确认删除
                    </button>
                    <button @click="showDeleteModal = false"
                        class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: transparent; color: #8a7e74; border: 1px solid #e7dbd0;"
                        @mouseenter="e => { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.color = '#4f4842'; }"
                        @mouseleave="e => { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.color = '#8a7e74'; }">
                        取消
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { postService, type PostResponse } from '../../services'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const post = ref<PostResponse | null>(null)
const loading = ref(true)
const showDeleteModal = ref(false)

// ====== 判断是否为自己的帖子 ======
const isMyPost = computed(() => {
    if (!post.value) return false
    const currentUser = userStore.user?.username
    return currentUser ? post.value.username === currentUser : false
})

// ====== 时间格式化 ======
const formatTime = (dateStr: string) => {
    if (!dateStr) return '刚刚'
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    if (diff < 172800000) return '昨天'
    if (diff < 259200000) return '前天'
    return `${date.getMonth() + 1}月${date.getDate()}日`
}

// ====== 加载帖子 ======
const loadPost = async () => {
    const id = route.params.id as string
    if (!id) {
        loading.value = false
        return
    }

    try {
        const result = await postService.getPost(id)
        post.value = result
    } catch (error) {
        console.error('加载帖子失败:', error)
        post.value = null
    } finally {
        loading.value = false
    }
}

// ====== 点赞 ======
const likePost = async () => {
    if (!post.value) return
    try {
        const result = await postService.likePost(post.value.id)
        post.value.likes = result.likes
    } catch (error) {
        console.error('点赞失败:', error)
    }
}

// ====== 删除 ======
const confirmDelete = () => {
    showDeleteModal.value = true
}

const deletePost = async () => {
    if (!post.value) return
    try {
        await postService.deletePost(post.value.id)
        showDeleteModal.value = false
        router.push('/community')
    } catch (error) {
        console.error('删除失败:', error)
        alert('删除失败，请重试')
    }
}

// ====== 返回 ======
const goBack = () => {
    router.push('/community')
}

onMounted(() => {
    userStore.restoreUser()
    loadPost()
})
</script>