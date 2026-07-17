<template>
    <div class="pt-20 pb-8">
        <div class="max-w-6xl mx-auto px-6">

            <!-- ====== 页面头部 ====== -->
            <section class="mb-10">
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <span class="text-2xl">🧘</span>
                            <h1 class="text-2xl font-light tracking-wide" style="color: #4f4842;">心灵资源</h1>
                        </div>
                        <p class="text-sm font-light" style="color: #6d6259;">
                            一些温暖的工具、知识和陪伴，在你需要的时候给你力量。
                        </p>
                        <div class="w-12 h-px mt-3" style="background: #dccfc4;"></div>
                    </div>
                </div>
            </section>

            <!-- ====== 分类导航 (标签式) ====== -->
            <div class="flex flex-wrap gap-2 mb-8">
                <button v-for="cat in categories" :key="cat.value" @click="activeCategory = cat.value"
                    class="px-5 py-1.5 text-xs font-light transition-all rounded-full" :style="activeCategory === cat.value
                        ? 'background: rgba(236, 227, 219, 0.6); color: #4f4842; border: 1px solid #dccfc4;'
                        : 'background: transparent; color: #8a7e74; border: 1px solid transparent;'"
                    @mouseenter="e => { if (activeCategory !== cat.value) { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'; } }"
                    @mouseleave="e => { if (activeCategory !== cat.value) { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; } }">
                    {{ cat.icon }} {{ cat.label }}
                </button>
            </div>

            <!-- ============================================================ -->
            <!-- ====== 资源卡片流 ====== -->
            <!-- ============================================================ -->
            <div class="space-y-10">

                <!-- ====== 1. 心理帮助网站 ====== -->
                <section v-if="activeCategory === 'all' || activeCategory === '网站'">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="text-xl">🌐</span>
                        <h2 class="text-base font-light tracking-wide" style="color: #4f4842;">心理帮助网站</h2>
                        <span class="text-xs font-light" style="color: #b8aa98;">专业 · 温暖 · 可靠</span>
                    </div>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div v-for="item in filteredWebsites" :key="item.id" class="p-6 transition-all rounded-[2rem]"
                            style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="text-2xl">{{ item.icon }}</span>
                                <span class="px-2 py-0.5 text-[10px] rounded-full"
                                    style="background: rgba(220, 207, 196, 0.3); color: #6d6259; border: 1px solid #e7dbd0;">
                                    {{ item.type }}
                                </span>
                            </div>
                            <h3 class="text-base font-light" style="color: #4f4842;">{{ item.title }}</h3>
                            <p class="text-sm font-light leading-relaxed mt-1" style="color: #6d6259;">{{
                                item.description }}</p>
                            <a :href="item.url" target="_blank" rel="noopener noreferrer"
                                class="inline-block mt-3 text-xs font-light transition-colors"
                                style="color: #8a7e74; border-bottom: 1px dotted #dccfc4;"
                                @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                访问网站 →
                            </a>
                        </div>
                    </div>
                </section>

                <!-- ====== 2. 实用 APP 推荐 ====== -->
                <section v-if="activeCategory === 'all' || activeCategory === 'APP'">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="text-xl">📱</span>
                        <h2 class="text-base font-light tracking-wide" style="color: #4f4842;">实用 APP 推荐</h2>
                        <span class="text-xs font-light" style="color: #b8aa98;">用心设计 · 陪伴日常</span>
                    </div>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div v-for="item in filteredApps" :key="item.id" class="p-6 transition-all rounded-[2rem]"
                            style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }">
                            <div class="flex items-start justify-between">
                                <div class="flex items-center gap-3 mb-2">
                                    <span class="text-2xl">{{ item.icon }}</span>
                                    <span class="px-2 py-0.5 text-[10px] rounded-full"
                                        style="background: rgba(220, 207, 196, 0.3); color: #6d6259; border: 1px solid #e7dbd0;">
                                        {{ item.platform }}
                                    </span>
                                </div>
                                <span v-if="item.recommend" class="text-[10px] font-light px-2 py-0.5 rounded-full"
                                    style="background: rgba(236, 227, 219, 0.5); color: #8a7e74; border: 1px solid #e7dbd0;">
                                    {{ item.recommend }}
                                </span>
                            </div>
                            <h3 class="text-base font-light" style="color: #4f4842;">{{ item.title }}</h3>
                            <p class="text-sm font-light leading-relaxed mt-1" style="color: #6d6259;">{{
                                item.description }}</p>
                            <div class="flex items-center gap-3 mt-3 pt-2"
                                style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                                <span class="text-xs font-light" style="color: #8a7e74;">{{ item.feature }}</span>
                                <a :href="item.url" target="_blank" rel="noopener noreferrer"
                                    class="text-xs font-light transition-colors"
                                    style="color: #8a7e74; border-bottom: 1px dotted #dccfc4;"
                                    @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                    @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                    了解 →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- ====== 3. 学习方法与练习 ====== -->
                <section v-if="activeCategory === 'all' || activeCategory === '练习'">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="text-xl">📖</span>
                        <h2 class="text-base font-light tracking-wide" style="color: #4f4842;">学习方法与练习</h2>
                        <span class="text-xs font-light" style="color: #b8aa98;">每日实践 · 慢慢成长</span>
                    </div>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div v-for="item in filteredPractices" :key="item.id" class="p-6 transition-all rounded-[2rem]"
                            style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }">
                            <div class="flex items-center gap-3 mb-2">
                                <span class="text-2xl">{{ item.icon }}</span>
                                <span class="px-2 py-0.5 text-[10px] rounded-full"
                                    style="background: rgba(220, 207, 196, 0.3); color: #6d6259; border: 1px solid #e7dbd0;">
                                    {{ item.category }}
                                </span>
                            </div>
                            <h3 class="text-base font-light" style="color: #4f4842;">{{ item.title }}</h3>
                            <p class="text-sm font-light leading-relaxed mt-1" style="color: #6d6259;">{{
                                item.description }}</p>
                            <button @click="openPractice(item)"
                                class="mt-3 px-4 py-1 text-xs font-light transition-all rounded-full"
                                style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0;"
                                @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                                @mouseleave="e => { e.currentTarget.style.background = 'rgba(236, 227, 219, 0.4)'; e.currentTarget.style.borderColor = '#e7dbd0'; }">
                                查看详情 →
                            </button>
                        </div>
                    </div>
                </section>

                <!-- 空状态 -->
                <div v-if="filteredWebsites.length === 0 && filteredApps.length === 0 && filteredPractices.length === 0"
                    class="text-center py-16"
                    style="background: rgba(255, 250, 245, 0.3); border-radius: 3rem; border: 1px dashed #e7dbd0;">
                    <div class="text-5xl mb-4">🌱</div>
                    <p class="text-sm font-light" style="color: #8a7e74;">该分类下暂无资源</p>
                </div>
            </div>
        </div>

        <!-- ====== 练习详情弹窗 ====== -->
        <div v-if="showPracticeModal" class="fixed inset-0 z-50 flex items-center justify-center px-4"
            style="background: rgba(44, 36, 28, 0.2); backdrop-filter: blur(4px);">
            <div class="w-full max-w-md p-8 rounded-[3rem]"
                style="background: rgba(255, 250, 245, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(230, 215, 200, 0.3); box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);">

                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <span class="text-3xl">{{ selectedPractice?.icon }}</span>
                        <h2 class="text-xl font-light tracking-wide" style="color: #4f4842;">{{ selectedPractice?.title
                            }}</h2>
                    </div>
                    <button @click="closePracticeModal" class="text-xl transition-colors" style="color: #b8aa98;"
                        @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                        @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">✕</button>
                </div>

                <div class="mb-2">
                    <span class="px-2 py-0.5 text-[10px] rounded-full"
                        style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0;">
                        {{ selectedPractice?.category }}
                    </span>
                    <span class="ml-2 text-xs font-light" style="color: #8a7e74;">{{ selectedPractice?.type }}</span>
                </div>

                <p class="text-sm font-light leading-relaxed mt-3" style="color: #6d6259; white-space: pre-line;">
                    {{ selectedPractice?.detail || selectedPractice?.description }}
                </p>

                <div v-if="selectedPractice?.tips" class="mt-4 p-4 rounded-[1.5rem]"
                    style="background: rgba(245, 238, 232, 0.3); border: 1px solid rgba(231, 219, 208, 0.3);">
                    <p class="text-xs font-light" style="color: #8a7e74;">💡 小贴士</p>
                    <p class="text-sm font-light mt-1" style="color: #4f4842;">{{ selectedPractice.tips }}</p>
                </div>

                <button @click="closePracticeModal"
                    class="w-full mt-6 py-2.5 text-sm font-light transition-all rounded-full"
                    style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                    @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                    @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                    我知道了
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ====== 分类导航 ======
const categories = ref([
    { value: 'all', label: '全部', icon: '✦' },
    { value: '网站', label: '帮助网站', icon: '🌐' },
    { value: 'APP', label: '实用 APP', icon: '📱' },
    { value: '练习', label: '方法练习', icon: '📖' },
])

const activeCategory = ref('all')

// ============================================================
// 1. 心理帮助网站
// ============================================================
const websites = ref([
    {
        id: 1,
        icon: '🫂',
        title: '北京心理危机干预中心',
        description: '24小时免费心理援助热线，提供紧急心理支持与干预。',
        url: 'https://www.crisis.org.cn',
        type: '热线·24h'
    },
    {
        id: 2,
        icon: '🌱',
        title: '简单心理',
        description: '专业心理咨询平台，提供在线咨询、心理测试和科普文章。',
        url: 'https://www.jiandanxinli.com',
        type: '咨询·科普'
    },
    {
        id: 3,
        icon: '📖',
        title: '壹心理',
        description: '心理健康服务平台，包含心理测试、课程和专家问答。',
        url: 'https://www.xinli001.com',
        type: '测试·课程'
    },
    {
        id: 4,
        icon: '🧠',
        title: 'KnowYourself',
        description: '专注于心理学科普与自我探索，提供深度文章和社群支持。',
        url: 'https://www.knowyourself.cc',
        type: '科普·社群'
    },
    {
        id: 5,
        icon: '📊',
        title: '云术心理测量平台',
        description: '提供 PHQ-9、GAD-7、SDS、SAS 等专业心理测评量表，科学评估心理健康状态。',
        url: 'https://pt.cldery.com',
        type: '测评·专业'
    },
])

// ============================================================
// 2. 实用 APP 推荐
// ============================================================
const apps = ref([
    {
        id: 1,
        icon: '📱',
        title: '脑电波',
        description: '专注于治愈与陪伴的跨平台情绪记录软件。100% 本地存储，不上传云端，给你的内心世界最安全的物理保护。包含情绪记录、日记、日历、统计分析、心理测评、用药提醒、隐私锁等功能。',
        platform: 'Flutter',
        feature: '100% 本地 · 治愈系 UI',
        recommend: '✨ 推荐',
        url: 'https://github.com/ClouderyStudio/mood-tab'
    },
    {
        id: 2,
        icon: '🧘',
        title: 'Headspace',
        description: '全球知名的冥想与睡眠应用，提供正念冥想、睡眠故事和舒缓音乐。',
        platform: 'iOS/Android',
        feature: '冥想 · 睡眠',
        url: 'https://www.headspace.com'
    },
    {
        id: 3,
        icon: '🌿',
        title: '潮汐',
        description: '专注、睡眠与放松应用。包含自然白噪音、番茄钟和冥想练习。',
        platform: 'iOS/Android',
        feature: '白噪音 · 专注',
        url: 'https://tide.fm'
    },
    {
        id: 4,
        icon: '💭',
        title: 'Day One',
        description: '优雅的个人日记应用，支持图文记录、时间线回顾和加密保护。',
        platform: 'iOS/macOS',
        feature: '日记 · 加密',
        url: 'https://dayoneapp.com'
    },
    {
        id: 5,
        icon: '🎵',
        title: 'Calm',
        description: '心理健康与睡眠应用，提供冥想课程、睡眠故事和放松音乐。',
        platform: 'iOS/Android',
        feature: '冥想 · 睡眠',
        url: 'https://www.calm.com'
    },
])

// ============================================================
// 3. 学习方法与练习
// ============================================================
const practices = ref([
    {
        id: 1,
        icon: '🌬️',
        title: '4-7-8 呼吸法',
        description: '一种简单的放松呼吸技巧，帮助缓解焦虑和压力。',
        detail: '1. 用鼻子轻轻吸气，默数 4 秒\n2. 屏住呼吸，默数 7 秒\n3. 用嘴巴慢慢呼气，默数 8 秒\n\n重复 3-5 次，感受身体的放松。',
        category: '呼吸',
        type: '练习 · 3分钟',
        tips: '如果觉得困难，可以缩短时间，找到自己舒适的节奏。'
    },
    {
        id: 2,
        icon: '🧘',
        title: '5分钟正念呼吸',
        description: '简单的正念呼吸练习，帮助你回到当下。',
        detail: '找一个安静的地方坐下，闭上眼睛。\n\n将注意力放在呼吸上，感受空气进入和离开身体的感觉。\n\n当思绪飘走时，温柔地把注意力带回到呼吸上。\n\n持续 5 分钟，每天练习。',
        category: '冥想',
        type: '练习 · 5分钟',
        tips: '不需要完美，走神是正常的，每次回来就是一次练习。'
    },
    {
        id: 3,
        icon: '✍️',
        title: '情绪日记模板',
        description: '帮助你梳理今天情绪的写作模板。',
        detail: '今天，我感受到的情绪是：\n_________________________\n\n这种情绪可能来自：\n_________________________\n\n我的身体反应是：\n_________________________\n\n我想对自己说：\n_________________________\n\n明天我希望：\n_________________________',
        category: '书写',
        type: '模板 · 10分钟',
        tips: '不用追求完美，真实地写下来就好。'
    },
    {
        id: 4,
        icon: '🌿',
        title: '阳台自然疗法',
        description: '在小小的一方阳台找回与自然的连接。',
        detail: '即使没有大花园，阳台也可以成为你的疗愈空间。\n\n试着：\n• 养一盆植物，观察它的生长\n• 坐在阳光下晒 10 分钟太阳\n• 闭上眼睛听风吹过的声音\n• 触摸土壤和叶子\n\n自然就在身边。',
        category: '自然',
        type: '指南 · 5分钟',
        tips: '今天就可以试试，哪怕只有 5 分钟。'
    },
    {
        id: 5,
        icon: '📚',
        title: '给自己的一封信',
        description: '一封写给自己的温暖信件。',
        detail: '亲爱的你：\n\n你已经在努力了，这就足够了。\n\n不要对自己太苛刻，你值得温柔相待。\n\n今天，如果觉得累了，就休息一下。\n\n你不需要完美，只需要真实。\n\n我在这里陪着你。',
        category: '阅读',
        type: '信件 · 3分钟',
        tips: '可以大声读给自己听，或者抄写下来。'
    },
    {
        id: 6,
        icon: '🙏',
        title: '感恩清单',
        description: '每天写下三件感恩的小事。',
        detail: '今天，我感激的是：\n\n1. _________________________\n2. _________________________\n3. _________________________\n\n即使是很小的事，也值得被看见。',
        category: '书写',
        type: '练习 · 3分钟',
        tips: '坚持每天写，会慢慢感受到生活的温暖。'
    },
])

// ============================================================
// 筛选逻辑
// ============================================================
const filteredWebsites = computed(() => {
    if (activeCategory.value === 'all' || activeCategory.value === '网站') return websites.value
    return []
})

const filteredApps = computed(() => {
    if (activeCategory.value === 'all' || activeCategory.value === 'APP') return apps.value
    return []
})

const filteredPractices = computed(() => {
    if (activeCategory.value === 'all' || activeCategory.value === '练习') return practices.value
    return []
})

// ============================================================
// 练习详情弹窗
// ============================================================
const showPracticeModal = ref(false)
const selectedPractice = ref<any>(null)

const openPractice = (item: any) => {
    selectedPractice.value = item
    showPracticeModal.value = true
}

const closePracticeModal = () => {
    showPracticeModal.value = false
    selectedPractice.value = null
}
</script>

<style scoped>
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

/* 卡片入场动画 */
.card-enter {
    animation: fadeUp 0.5s ease-out forwards;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>