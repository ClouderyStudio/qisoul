<template>
    <div class="pt-20 pb-8">
        <div class="max-w-6xl mx-auto px-6">
            <!-- 欢迎语 -->
            <div class="mb-8">
                <h1 class="text-2xl font-light tracking-wide" style="color: #4f4842;">
                    {{ greeting }}，{{ userStore.getUsername }}
                </h1>
                <p class="text-sm mt-1 font-light" style="color: #6d6259;">
                    今天的心情如何？记得给自己一些温柔的关照。
                </p>
                <div class="w-12 h-px mt-3" style="background: #dccfc4;"></div>
            </div>

            <!-- 快捷操作 -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <button @click="showMoodModal = true" class="p-5 text-left transition-all rounded-[2.5rem]"
                    style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                    @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.04)'; }"
                    @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">
                    <div class="text-2xl mb-2">📝</div>
                    <div class="text-sm font-light" style="color: #4f4842;">记录心情</div>
                    <div class="text-xs mt-0.5 font-light" style="color: #8a7e74;">今日还未记录</div>
                </button>

                <router-link to="/community" class="p-5 text-left transition-all rounded-[2.5rem]"
                    style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0; display: block;"
                    @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.04)'; }"
                    @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">
                    <div class="text-2xl mb-2">💬</div>
                    <div class="text-sm font-light" style="color: #4f4842;">温暖社区</div>
                    <div class="text-xs mt-0.5 font-light" style="color: #8a7e74;">看看大家的故事</div>
                </router-link>

                <router-link to="/resources" class="p-5 text-left transition-all rounded-[2.5rem]"
                    style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0; display: block;"
                    @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.04)'; }"
                    @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">
                    <div class="text-2xl mb-2">🧘</div>
                    <div class="text-sm font-light" style="color: #4f4842;">舒缓资源</div>
                    <div class="text-xs mt-0.5 font-light" style="color: #8a7e74;">温暖工具与陪伴</div>
                </router-link>

                <button @click="viewStats" class="p-5 text-left transition-all rounded-[2.5rem]"
                    style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                    @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.04)'; }"
                    @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">
                    <div class="text-2xl mb-2">📊</div>
                    <div class="text-sm font-light" style="color: #4f4842;">查看趋势</div>
                    <div class="text-xs mt-0.5 font-light" style="color: #8a7e74;">近7天情绪变化</div>
                </button>
            </div>

            <!-- 主内容 -->
            <div class="grid lg:grid-cols-3 gap-6">
                <!-- 近期心情 -->
                <div class="lg:col-span-2 p-6 rounded-[2.5rem]"
                    style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;">
                    <div class="flex items-center justify-between mb-5">
                        <h2 class="text-lg font-light tracking-wide" style="color: #4f4842;">近期心情</h2>
                        <span class="text-xs font-light" style="color: #8a7e74;">近7天</span>
                    </div>

                    <div v-if="recentMoods.length === 0" class="text-center py-8">
                        <div class="text-4xl mb-3">🌱</div>
                        <p class="text-sm font-light" style="color: #8a7e74;">还没有心情记录</p>
                        <p class="text-xs mt-1 font-light" style="color: #b8aa98;">点击「记录心情」开始你的第一次记录</p>
                    </div>

                    <div v-else class="space-y-2">
                        <div v-for="item in recentMoods" :key="item.id"
                            class="flex items-center justify-between p-3 rounded-full transition-all"
                            style="border-bottom: 1px solid rgba(231, 219, 208, 0.3);"
                            @mouseenter="e => e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'"
                            @mouseleave="e => e.currentTarget.style.background = 'transparent'">
                            <div class="flex items-center gap-3">
                                <span class="text-xl">{{ getMoodIcon(item.moodType) }}</span>
                                <div>
                                    <div class="text-sm font-light" style="color: #4f4842;">{{ item.moodLabel }}</div>
                                    <div class="text-xs font-light" style="color: #8a7e74;">{{ item.note || '无备注' }}
                                    </div>
                                </div>
                            </div>
                            <span class="text-xs font-light" style="color: #b8aa98;">{{ formatTime(item.recordDate)
                            }}</span>
                        </div>
                    </div>
                </div>

                <!-- 右侧统计 -->
                <div class="space-y-6">
                    <div class="p-6 rounded-[2.5rem]"
                        style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;">
                        <h3 class="text-sm font-light tracking-wide" style="color: #4f4842;">本月概览</h3>
                        <div class="w-8 h-px mt-2 mb-4" style="background: #dccfc4;"></div>
                        <div class="space-y-3 text-sm font-light">
                            <div class="flex items-center justify-between">
                                <span style="color: #6d6259;">记录天数</span>
                                <span style="color: #4f4842;">{{ stats.totalDays || 0 }} 天</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span style="color: #6d6259;">总记录</span>
                                <span style="color: #4f4842;">{{ stats.totalRecords || 0 }} 条</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span style="color: #6d6259;">今日心情</span>
                                <span style="color: #8a7e74;">{{ stats.todayMood || '未记录' }}</span>
                            </div>
                            <div class="flex items-center justify-between pt-2" style="border-top: 1px dashed #e7dbd0;">
                                <span style="color: #6d6259;">连续记录</span>
                                <span style="color: #8a7e74;">{{ stats.streak || 0 }} 天 🔥</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 rounded-[3rem]"
                        style="background: rgba(245, 238, 232, 0.4); backdrop-filter: blur(2px); border-left: 6px solid #dccfc4;">
                        <div class="flex items-start gap-3">
                            <span class="text-xl">💛</span>
                            <p class="text-sm leading-relaxed font-light" style="color: #4b423c; font-style: italic;">
                                "{{ dailyReminder }}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 社区动态 -->
            <div class="mt-8 p-6 rounded-[2.5rem]"
                style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-light tracking-wide" style="color: #4f4842;">社区温暖动态</h3>
                    <router-link to="/community" class="text-xs font-light transition-colors" style="color: #8a7e74;"
                        @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                        @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                        查看全部 →
                    </router-link>
                </div>
                <div v-if="communityPosts.length === 0" class="text-center py-4">
                    <p class="text-sm font-light" style="color: #8a7e74;">暂无社区动态</p>
                </div>
                <div v-else class="grid sm:grid-cols-2 gap-4">
                    <div v-for="post in communityPosts" :key="post.id"
                        class="p-3 rounded-[2rem] transition-all cursor-pointer"
                        style="border: 1px solid rgba(239, 231, 224, 0.6);"
                        @mouseenter="e => e.currentTarget.style.borderColor = '#dfd2c6'"
                        @mouseleave="e => e.currentTarget.style.borderColor = 'rgba(239, 231, 224, 0.6)'"
                        @click="viewPostDetail(post.id)">
                        <p class="text-sm leading-relaxed font-light" style="color: #4b423c;">
                            "{{ truncateText(stripMarkdown(post.content), 60) }}"
                        </p>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-xs font-light" style="color: #8a7e74;">{{ post.username || '匿名用户'
                            }}</span>
                            <span class="text-xs font-light" style="color: #b8aa98;">{{ formatTime(post.createdAt)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 记录心情弹窗 -->
        <div v-if="showMoodModal" class="fixed inset-0 z-50 flex items-center justify-center px-4"
            style="background: rgba(44, 36, 28, 0.2); backdrop-filter: blur(4px);">
            <div class="w-full max-w-md p-8 rounded-[3rem]"
                style="background: rgba(255, 250, 245, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(230, 215, 200, 0.3); box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-light tracking-wide" style="color: #4f4842;">记录今天的心情</h2>
                    <button @click="closeModal" class="text-xl transition-colors" style="color: #b8aa98;"
                        @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                        @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">✕</button>
                </div>

                <div class="grid grid-cols-5 gap-3 mb-6">
                    <button v-for="mood in moodOptions" :key="mood.value" @click="selectedMood = mood.value"
                        class="py-3 text-center transition-all text-2xl rounded-full"
                        :style="selectedMood === mood.value ? 'background: rgba(236, 227, 219, 0.6); border: 1px solid #dccfc4;' : 'border: 1px solid transparent;'"
                        @mouseenter="e => { if (selectedMood !== mood.value) { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'; } }"
                        @mouseleave="e => { if (selectedMood !== mood.value) { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; } }">
                        {{ mood.icon }}
                    </button>
                </div>

                <div class="flex gap-2 mb-4 flex-wrap">
                    <button v-for="tag in presetTags" :key="tag" @click="addTag(tag)"
                        class="px-3 py-1 text-xs rounded-full transition-all"
                        style="background: rgba(236, 227, 219, 0.3); border: 1px solid #e7dbd0; color: #6d6259;"
                        @mouseenter="e => { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(236, 227, 219, 0.5)'; }"
                        @mouseleave="e => { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.background = 'rgba(236, 227, 219, 0.3)'; }">
                        #{{ tag }}
                    </button>
                </div>

                <textarea v-model="moodNote" rows="3"
                    class="w-full p-3 text-sm transition-all resize-none rounded-[1.5rem]"
                    style="background: rgba(245, 238, 232, 0.3); border: 1px solid #e7dbd0; color: #4b423c; font-weight: 300; font-family: 'Segoe UI', sans-serif;"
                    placeholder="今天的感受是..." @focus="e => e.currentTarget.style.borderColor = '#dccfc4'"
                    @blur="e => e.currentTarget.style.borderColor = '#e7dbd0'"></textarea>

                <div class="flex gap-3 mt-6">
                    <button @click="saveMood" class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                        @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                        @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                        {{ submitting ? '保存中...' : '保存记录' }}
                    </button>
                    <button @click="closeModal" class="px-6 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: transparent; color: #8a7e74; border: 1px solid #e7dbd0;"
                        @mouseenter="e => { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.color = '#4f4842'; }"
                        @mouseleave="e => { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.color = '#8a7e74'; }">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { moodService, postService, statsService, type MoodRecordResponse, type PostResponse, type StatsResponse } from '../services'
import { truncateText, stripMarkdown } from '../utils/text'

const router = useRouter()
const userStore = useUserStore()

// ====== 状态 ======
const showMoodModal = ref(false)
const selectedMood = ref('')
const moodNote = ref('')
const selectedTags = ref<string[]>([])
const submitting = ref(false)

const recentMoods = ref<MoodRecordResponse[]>([])
const communityPosts = ref<PostResponse[]>([])
const stats = ref<StatsResponse>({
    totalDays: 0,
    totalRecords: 0,
    todayMood: '未记录',
    streak: 0,
    trends: [],
    distribution: [],
})

const viewPostDetail = (postId: string) => {
    router.push(`/community/post/${postId}`)
}

// ====== 常量 ======
const moodOptions = ref([
    { icon: '😊', value: 'happy', label: '开心' },
    { icon: '😌', value: 'calm', label: '平静' },
    { icon: '🙏', value: 'grateful', label: '感恩' },
    { icon: '🤩', value: 'excited', label: '兴奋' },
    { icon: '😐', value: 'neutral', label: '一般' },
    { icon: '😫', value: 'tired', label: '疲惫' },
    { icon: '😢', value: 'sad', label: '难过' },
    { icon: '😰', value: 'anxious', label: '焦虑' },
    { icon: '😤', value: 'angry', label: '愤怒' },
    { icon: '🥺', value: 'lonely', label: '孤独' },
])

const presetTags = ref(['工作', '学习', '家庭', '朋友', '运动', '睡眠', '饮食', '天气'])

const dailyReminder = ref('允许自己有不完美的一天，每一种情绪都值得被看见。')

// ====== 计算属性 ======
const greeting = computed(() => {
    const hour = new Date().getHours()
    if (hour < 6) return '夜深了'
    if (hour < 9) return '早上好'
    if (hour < 12) return '上午好'
    if (hour < 14) return '中午好'
    if (hour < 18) return '下午好'
    if (hour < 22) return '晚上好'
    return '夜深了'
})

// ====== 方法 ======
const getMoodIcon = (moodType: string) => {
    const found = moodOptions.value.find(m => m.value === moodType)
    return found?.icon || '😐'
}

const formatTime = (dateStr: string) => {
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

const addTag = (tag: string) => {
    if (!selectedTags.value.includes(tag)) {
        selectedTags.value.push(tag)
    } else {
        selectedTags.value = selectedTags.value.filter(t => t !== tag)
    }
}

// ====== 加载数据 ======
const loadData = async () => {
    try {
        // 加载心情记录
        const records = await moodService.getRecords(7)
        recentMoods.value = records.slice(0, 5)

        // 加载统计数据
        const statsData = await statsService.getStats(30, 'week')
        stats.value = statsData

        // 加载社区动态
        const posts = await postService.getPosts('all', 1, 4)
        communityPosts.value = posts.data
    } catch (error) {
        console.error('加载数据失败:', error)
    }
}

// ====== 保存心情 ======
const saveMood = async () => {
    if (!selectedMood.value) {
        alert('请选择你的心情')
        return
    }

    submitting.value = true
    try {
        await moodService.createRecord({
            moodType: selectedMood.value,
            intensity: 3,
            note: moodNote.value || undefined,
            tags: selectedTags.value.length > 0 ? selectedTags.value.join(',') : undefined,
        })

        // 刷新数据
        await loadData()
        closeModal()
    } catch (error) {
        console.error('保存失败:', error)
        alert('保存失败，请重试')
    } finally {
        submitting.value = false
    }
}

const viewStats = () => {
    // TODO: 跳转到统计页面
    console.log('查看统计')
}

const closeModal = () => {
    showMoodModal.value = false
    selectedMood.value = ''
    moodNote.value = ''
    selectedTags.value = []
}

// ====== 生命周期 ======
onMounted(async () => {
    // 恢复登录状态
    userStore.restoreUser()
    // 加载数据
    await loadData()
})
</script>