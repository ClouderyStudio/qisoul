<template>
    <div class="pt-20 pb-8">
        <div class="max-w-6xl mx-auto px-6">

            <!-- ====== 页面头部 ====== -->
            <section class="mb-10">
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <span class="text-2xl">💬</span>
                            <h1 class="text-2xl font-light tracking-wide" style="color: #4f4842;">温暖社区</h1>
                        </div>
                        <p class="text-sm font-light" style="color: #6d6259;">
                            分享你的方法，倾听他人的故事。在这里，我们互为光亮。
                        </p>
                        <div class="w-12 h-px mt-3" style="background: #dccfc4;"></div>
                    </div>
                    <button @click="openCreateModal"
                        class="px-6 py-2.5 text-sm font-light transition-all rounded-full flex items-center gap-2"
                        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                        @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                        @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                        <span>✏️</span> 分享你的方法
                    </button>
                </div>
            </section>

            <!-- ====== 激励横幅 ====== -->
            <div class="relative mb-6 px-6 py-4 rounded-[2rem] text-center overflow-hidden"
                style="background: linear-gradient(135deg, rgba(236, 227, 219, 0.4), rgba(245, 238, 232, 0.6)); border: 1px solid rgba(230, 215, 200, 0.3);">
                <!-- 装饰小点 -->
                <div class="absolute -top-4 -right-4 text-4xl opacity-10">✦</div>
                <div class="absolute -bottom-4 -left-4 text-4xl opacity-10">✦</div>

                <p class="text-sm font-light leading-relaxed" style="color: #4f4842;">
                    💛 每一个声音都值得被听见。<br class="sm:hidden">
                    <span class="hidden sm:inline"> </span>
                    你的分享，或许正是此刻某个人需要的光。
                </p>
                <div class="flex items-center justify-center gap-3 mt-2">
                    <span class="text-xs font-light" style="color: #8a7e74;">✨ 勇敢发声</span>
                    <span class="w-px h-3" style="background: #dccfc4;"></span>
                    <span class="text-xs font-light" style="color: #8a7e74;">🌱 温暖传递</span>
                    <span class="w-px h-3" style="background: #dccfc4;"></span>
                    <span class="text-xs font-light" style="color: #8a7e74;">🫂 彼此照亮</span>
                </div>
            </div>

            <!-- ====== 内容区：帖子居中，便签左右环绕 ====== -->
            <div class="relative">

                <!-- 空状态 -->
                <div v-if="filteredPosts.length === 0 && filteredStickies.length === 0" class="text-center py-16"
                    style="background: rgba(255, 250, 245, 0.3); border-radius: 3rem; border: 1px dashed #e7dbd0;">
                    <div class="text-5xl mb-4">🌱</div>
                    <p class="text-sm font-light" style="color: #8a7e74;">还没有分享</p>
                    <p class="text-xs font-light mt-1" style="color: #b8aa98;">成为第一个分享抵抗方法的人吧</p>
                </div>

                <!-- 有内容时 -->
                <div v-else>

                    <!-- ====== 便签 - 左侧浮动 ====== -->
                    <div class="sticky-side left">
                        <div v-for="(item, index) in leftStickies" :key="item.id" class="sticky-note sticky-left"
                            :style="{
                                background: item.color || 'rgba(255, 250, 245, 0.6)',
                                border: '1px solid #efe7e0',
                                transform: `rotate(${item.rotate || -1.5}deg)`,
                                animationDelay: `${index * 0.08}s`
                            }" @mouseenter="e => {
                                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                                e.currentTarget.style.borderColor = '#dfd2c6';
                                e.currentTarget.style.boxShadow = '0 12px 28px rgba(150, 130, 110, 0.1)';
                                e.currentTarget.style.zIndex = '20';
                            }" @mouseleave="e => {
                                e.currentTarget.style.transform = `rotate(${item.rotate || -1.5}deg) scale(1)`;
                                e.currentTarget.style.borderColor = '#efe7e0';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.zIndex = '1';
                            }">
                            <div class="flex items-start justify-between mb-1.5">
                                <span class="text-base">{{ item.icon || '📌' }}</span>
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.time }}</span>
                            </div>
                            <p class="text-xs font-light leading-relaxed" style="color: #4b423c;">{{ item.content }}</p>
                            <div class="flex items-center justify-between mt-2 pt-1.5"
                                style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                                <span class="text-[10px] font-light" style="color: #8a7e74;">💛 {{ item.likes }}</span>
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.author }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- ====== 帖子 - 居中 ====== -->
                    <div class="post-center">
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span class="text-xs font-light mr-1"
                                style="color: #8a7e74; line-height: 28px;">帖子分类：</span>
                            <button v-for="cat in postCategories" :key="cat.value" @click="selectedCategory = cat.value"
                                class="px-4 py-1 text-xs font-light transition-all rounded-full" :style="selectedCategory === cat.value
                                    ? 'background: rgba(236, 227, 219, 0.6); color: #4f4842; border: 1px solid #dccfc4;'
                                    : 'background: transparent; color: #8a7e74; border: 1px solid transparent;'"
                                @mouseenter="e => { if (selectedCategory !== cat.value) { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'; } }"
                                @mouseleave="e => { if (selectedCategory !== cat.value) { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; } }">
                                {{ cat.label }}
                            </button>
                        </div>
                        <div v-for="post in filteredPosts" :key="post.id"
                            class="p-6 transition-all rounded-[2.5rem] mb-2"
                            style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.06)'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="text-lg">{{ post.icon || '📖' }}</span>
                                        <h3 class="text-base font-light" style="color: #4f4842;">{{ post.title }}</h3>
                                        <span class="px-2 py-0.5 text-[10px] rounded-full"
                                            style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0; flex-shrink: 0;">{{
                                                post.category }}</span>
                                    </div>
                                    <p class="text-sm font-light leading-relaxed"
                                        style="color: #6d6259; white-space: pre-line;">{{ post.content }}</p>
                                    <div class="flex flex-wrap items-center gap-4 mt-3 pt-2"
                                        style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                                        <span class="text-xs font-light" style="color: #8a7e74;">👤 {{ post.author
                                        }}</span>
                                        <span class="text-xs font-light" style="color: #b8aa98;">{{ post.time }}</span>
                                        <span class="text-xs font-light" style="color: #8a7e74;">💛 {{ post.likes
                                        }}</span>
                                        <span class="text-xs font-light" style="color: #8a7e74;">💬 {{ post.comments
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ====== 便签 - 右侧浮动 ====== -->
                    <div class="sticky-side right">
                        <div v-for="(item, index) in rightStickies" :key="item.id" class="sticky-note sticky-right"
                            :style="{
                                background: item.color || 'rgba(255, 250, 245, 0.6)',
                                border: '1px solid #efe7e0',
                                transform: `rotate(${item.rotate || 1.5}deg)`,
                                animationDelay: `${index * 0.08}s`
                            }" @mouseenter="e => {
                                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                                e.currentTarget.style.borderColor = '#dfd2c6';
                                e.currentTarget.style.boxShadow = '0 12px 28px rgba(150, 130, 110, 0.1)';
                                e.currentTarget.style.zIndex = '20';
                            }" @mouseleave="e => {
                                e.currentTarget.style.transform = `rotate(${item.rotate || 1.5}deg) scale(1)`;
                                e.currentTarget.style.borderColor = '#efe7e0';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.zIndex = '1';
                            }">
                            <div class="flex items-start justify-between mb-1.5">
                                <span class="text-base">{{ item.icon || '📌' }}</span>
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.time }}</span>
                            </div>
                            <p class="text-xs font-light leading-relaxed" style="color: #4b423c;">{{ item.content }}</p>
                            <div class="flex items-center justify-between mt-2 pt-1.5"
                                style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                                <span class="text-[10px] font-light" style="color: #8a7e74;">💛 {{ item.likes }}</span>
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.author }}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ====== 加载更多 ====== -->
            <div class="text-center mt-8">
                <button class="px-8 py-2 text-sm font-light transition-all rounded-full"
                    style="color: #8a7e74; border: 1px solid #e7dbd0;"
                    @mouseenter="e => { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.color = '#4f4842'; }"
                    @mouseleave="e => { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.color = '#8a7e74'; }">
                    加载更多
                </button>
            </div>
        </div>

        <!-- ====== 创建分享弹窗 ====== -->
        <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center px-4"
            style="background: rgba(44, 36, 28, 0.2); backdrop-filter: blur(4px);">
            <div class="w-full max-w-lg p-8 rounded-[3rem]"
                style="background: rgba(255, 250, 245, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(230, 215, 200, 0.3); box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08); max-height: 90vh; overflow-y: auto;">

                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-light tracking-wide" style="color: #4f4842;">分享你的方法</h2>
                    <button @click="closeModal" class="text-xl transition-colors" style="color: #b8aa98;"
                        @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                        @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">✕</button>
                </div>

                <!-- 选择分享形式 -->
                <div class="flex gap-3 mb-6">
                    <button v-for="type in shareTypes" :key="type.value" @click="shareType = type.value"
                        class="flex-1 py-3 text-sm font-light transition-all rounded-full text-center" :style="shareType === type.value
                            ? 'background: rgba(236, 227, 219, 0.6); color: #4f4842; border: 1px solid #dccfc4;'
                            : 'background: transparent; color: #8a7e74; border: 1px solid #e7dbd0;'"
                        @mouseenter="e => { if (shareType !== type.value) { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'; } }"
                        @mouseleave="e => { if (shareType !== type.value) { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.background = 'transparent'; } }">
                        {{ type.icon }} {{ type.label }}
                    </button>
                </div>

                <!-- 便签表单 -->
                <div v-if="shareType === 'sticky'" class="space-y-4">
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">便签内容</label>
                        <textarea v-model="stickyContent" rows="4"
                            class="w-full p-3 text-sm transition-all resize-none rounded-[1.5rem]"
                            style="background: rgba(245, 238, 232, 0.3); border: 1px solid #e7dbd0; color: #4b423c; font-weight: 300; font-family: 'Segoe UI', sans-serif;"
                            placeholder="写一个简短的小方法或暖心提醒..." @focus="e => e.currentTarget.style.borderColor = '#dccfc4'"
                            @blur="e => e.currentTarget.style.borderColor = '#e7dbd0'"></textarea>
                    </div>
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">便签颜色</label>
                        <div class="flex gap-3">
                            <button v-for="color in stickyColors" :key="color"
                                class="w-8 h-8 rounded-full transition-all"
                                :style="{ background: color, border: selectedColor === color ? '2px solid #4f4842' : '2px solid transparent' }"
                                @click="selectedColor = color"
                                @mouseenter="e => e.currentTarget.style.transform = 'scale(1.1)'"
                                @mouseleave="e => e.currentTarget.style.transform = 'scale(1)'">
                            </button>
                        </div>
                    </div>
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">图标（可选）</label>
                        <div class="flex gap-2 flex-wrap">
                            <button v-for="icon in stickyIcons" :key="icon"
                                class="w-10 h-10 text-lg rounded-full transition-all"
                                :style="selectedIcon === icon ? 'background: rgba(236, 227, 219, 0.6); border: 1px solid #dccfc4;' : 'border: 1px solid transparent;'"
                                @click="selectedIcon = icon"
                                @mouseenter="e => { if (selectedIcon !== icon) { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'; } }"
                                @mouseleave="e => { if (selectedIcon !== icon) { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; } }">
                                {{ icon }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 帖子表单 -->
                <div v-else class="space-y-4">
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">标题</label>
                        <input v-model="postTitle" type="text"
                            class="w-full p-3 text-sm transition-all rounded-[1.5rem]"
                            style="background: rgba(245, 238, 232, 0.3); border: 1px solid #e7dbd0; color: #4b423c; font-weight: 300; font-family: 'Segoe UI', sans-serif;"
                            placeholder="给你的方法起个标题..." @focus="e => e.currentTarget.style.borderColor = '#dccfc4'"
                            @blur="e => e.currentTarget.style.borderColor = '#e7dbd0'" />
                    </div>
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">分类</label>
                        <select v-model="postCategory"
                            class="w-full p-3 text-sm transition-all rounded-[1.5rem] appearance-none"
                            style="background: rgba(245, 238, 232, 0.3); border: 1px solid #e7dbd0; color: #4b423c; font-weight: 300; font-family: 'Segoe UI', sans-serif; cursor: pointer;"
                            @focus="e => e.currentTarget.style.borderColor = '#dccfc4'"
                            @blur="e => e.currentTarget.style.borderColor = '#e7dbd0'">
                            <option value="心理调节">心理调节</option>
                            <option value="生活习惯">生活习惯</option>
                            <option value="社交支持">社交支持</option>
                            <option value="专业帮助">专业帮助</option>
                            <option value="日常小技巧">日常小技巧</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">内容</label>
                        <textarea v-model="postContent" rows="6"
                            class="w-full p-3 text-sm transition-all resize-none rounded-[1.5rem]"
                            style="background: rgba(245, 238, 232, 0.3); border: 1px solid #e7dbd0; color: #4b423c; font-weight: 300; font-family: 'Segoe UI', sans-serif;"
                            placeholder="详细分享你的经验和方法..." @focus="e => e.currentTarget.style.borderColor = '#dccfc4'"
                            @blur="e => e.currentTarget.style.borderColor = '#e7dbd0'"></textarea>
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <button @click="submitShare" class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                        @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                        @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                        发布分享
                    </button>
                    <button @click="closeModal" class="px-6 py-2.5 text-sm font-light transition-all rounded-full"
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
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// ====== 分类 ======
const tabs = ref([
    { value: 'all', label: '全部' },
    { value: 'sticky', label: '📌 便签' },
    { value: 'post', label: '📖 帖子' },
])
const activeTab = ref('all')

// ====== 便签数据 ======
const stickies = ref([
    {
        id: 1,
        content: '每天给自己 5 分钟，什么都不做，只是安静地呼吸。',
        author: '匿名用户',
        time: '今天 10:30',
        likes: 24,
        icon: '🌿',
        color: 'rgba(236, 227, 219, 0.45)',
        rotate: -1.5
    },
    {
        id: 2,
        content: '情绪来的时候，试着给它命名。看见它，接纳它，它就会慢慢流过。',
        author: '匿名用户',
        time: '昨天 22:15',
        likes: 18,
        icon: '💛',
        color: 'rgba(215, 195, 180, 0.35)',
        rotate: 2
    },
    {
        id: 3,
        content: '写一封不寄出的信，把心里的话都写在纸上。',
        author: '匿名用户',
        time: '昨天 14:20',
        likes: 12,
        icon: '✉️',
        color: 'rgba(220, 207, 196, 0.4)',
        rotate: -0.8
    },
    {
        id: 4,
        content: '当焦虑来袭，把手放在胸口，感受自己的心跳。',
        author: '匿名用户',
        time: '前天 09:10',
        likes: 31,
        icon: '🫂',
        color: 'rgba(245, 230, 220, 0.4)',
        rotate: 1.2
    },
    {
        id: 5,
        content: '阳光是最好的疗愈师。每天至少晒 15 分钟太阳。',
        author: '匿名用户',
        time: '前天 16:45',
        likes: 9,
        icon: '☀️',
        color: 'rgba(236, 227, 219, 0.35)',
        rotate: -2
    },
    {
        id: 6,
        content: '和信任的人说说话，哪怕只是简单的一句"我今天不太好"。',
        author: '匿名用户',
        time: '3天前 20:30',
        likes: 22,
        icon: '💬',
        color: 'rgba(200, 180, 165, 0.3)',
        rotate: 1.8
    },
])

// ====== 帖子数据 ======
const posts = ref([
    {
        id: 1,
        title: '我如何通过晨间日记走出抑郁情绪',
        content: '三年前我被诊断为抑郁症，尝试了各种方法后，我发现晨间日记是最有效的。每天早上醒来，我不急着看手机，而是拿起笔记本，写下三件事：昨晚的梦境、醒来时的第一感受、今天想完成的一件事。这个方法让我重新建立了与自己内心的连接。',
        author: '匿名用户',
        time: '昨天 09:00',
        likes: 45,
        comments: 12,
        category: '心理调节',
        icon: '📓'
    },
    {
        id: 2,
        title: '社交焦虑的 5 个小技巧',
        content: '1. 提前准备话题清单\n2. 深呼吸三次再开口\n3. 专注倾听比说话更重要\n4. 允许自己有沉默的时刻\n5. 结束后给自己一个积极的反馈。这些小技巧帮我慢慢走出了社交恐惧。',
        author: '匿名用户',
        time: '前天 16:30',
        likes: 32,
        comments: 8,
        category: '日常小技巧',
        icon: '🌱'
    },
    {
        id: 3,
        title: '接纳不完美的自己',
        content: '完美主义是我焦虑的来源。后来我学会对自己说：我允许自己犯错，允许自己不完美。这个简单的自我对话，让我从焦虑中解放出来。',
        author: '匿名用户',
        time: '3天前 20:10',
        likes: 28,
        comments: 6,
        category: '心理调节',
        icon: '🕊️'
    },
])

// ====== 筛选 ======
// 便签全部显示
const filteredStickies = computed(() => {
    return stickies.value
})

// 帖子按分类筛选
const filteredPosts = computed(() => {
    if (selectedCategory.value === 'all') {
        return posts.value
    }
    return posts.value.filter(p => p.category === selectedCategory.value)
})

// ====== 帖子分类筛选 ======
const selectedCategory = ref('all')
const postCategories = ref([
    { value: 'all', label: '全部' },
    { value: '心理调节', label: '心理调节' },
    { value: '生活习惯', label: '生活习惯' },
    { value: '社交支持', label: '社交支持' },
    { value: '专业帮助', label: '专业帮助' },
    { value: '日常小技巧', label: '日常小技巧' },
])

// ====== 便签分布：左右交替 ======
const leftStickies = computed(() => {
    return filteredStickies.value.filter((_, i) => i % 2 === 0)
})

const rightStickies = computed(() => {
    return filteredStickies.value.filter((_, i) => i % 2 === 1)
})

// ====== 弹窗 ======
const showCreateModal = ref(false)
const shareType = ref<'sticky' | 'post'>('sticky')

const shareTypes = ref([
    { value: 'sticky', icon: '📌', label: '便签' },
    { value: 'post', icon: '📖', label: '帖子' },
])

// 便签相关
const stickyContent = ref('')
const selectedColor = ref('rgba(236, 227, 219, 0.45)')
const selectedIcon = ref('📌')
const stickyColors = ref([
    'rgba(236, 227, 219, 0.45)',
    'rgba(215, 195, 180, 0.35)',
    'rgba(220, 207, 196, 0.4)',
    'rgba(200, 180, 165, 0.3)',
    'rgba(245, 230, 220, 0.4)',
])
const stickyIcons = ref(['📌', '🌿', '💛', '✨', '🕊️', '☀️', '🌸', '🌙', '✉️', '🌟', '🫂', '🌱', '💬'])

// 帖子相关
const postTitle = ref('')
const postCategory = ref('心理调节')
const postContent = ref('')

// ====== 方法 ======
const openCreateModal = () => {
    showCreateModal.value = true
    shareType.value = 'sticky'
    resetForm()
}

const closeModal = () => {
    showCreateModal.value = false
    resetForm()
}

const resetForm = () => {
    stickyContent.value = ''
    postTitle.value = ''
    postCategory.value = '心理调节'
    postContent.value = ''
    selectedColor.value = 'rgba(236, 227, 219, 0.45)'
    selectedIcon.value = '📌'
}

const submitShare = () => {
    if (shareType.value === 'sticky') {
        if (!stickyContent.value.trim()) {
            alert('请写下你的便签内容')
            return
        }
        const newSticky = {
            id: Date.now(),
            content: stickyContent.value.trim(),
            author: userStore.getUsername || '匿名用户',
            time: '刚刚',
            likes: 0,
            icon: selectedIcon.value,
            color: selectedColor.value,
            rotate: (Math.random() - 0.5) * 4,
        }
        stickies.value.unshift(newSticky)
    } else {
        if (!postTitle.value.trim() || !postContent.value.trim()) {
            alert('请填写标题和内容')
            return
        }
        const newPost = {
            id: Date.now(),
            title: postTitle.value.trim(),
            content: postContent.value.trim(),
            author: userStore.getUsername || '匿名用户',
            time: '刚刚',
            likes: 0,
            comments: 0,
            category: postCategory.value,
            icon: '📖',
        }
        posts.value.unshift(newPost)
    }
    closeModal()
}

onMounted(() => {
    userStore.restoreUser()
})
</script>

<style scoped>
/* ====== 帖子居中，便签左右环绕 ====== */
.sticky-side {
    position: absolute;
    top: 0;
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.sticky-side.left {
    left: 0px;
}

.sticky-side.right {
    right: 0px;
}

/* 底部便签行 */
.sticky-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px dashed rgba(231, 219, 208, 0.4);
}

.sticky-bottom-item {
    max-width: 200px;
    flex-shrink: 0;
}

/* 单个便签 */
.sticky-note {
    padding: 10px 14px;
    border-radius: 1rem;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0;
    animation: stickyAppear 0.5s ease-out forwards;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    font-size: 12px;
    cursor: default;
}

/* 便签出现动画 */
@keyframes stickyAppear {
    from {
        opacity: 0;
        transform: translateY(16px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 帖子居中区域 */
.post-center {
    max-width: 640px;
    margin: 0 auto;
}

/* 滚动条美化 */
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #dccfc4;
    border-radius: 9999px;
}

@media (max-width: 992px) {
    .sticky-side {
        display: none;
    }

    .post-center {
        max-width: 100%;
    }

    .sticky-bottom {
        display: flex;
    }
}
</style>