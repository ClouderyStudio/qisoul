<!-- src/views/CommunityView.vue -->
<template>
    <div class="pt-20 pb-8">
        <div class="max-w-7xl mx-auto px-6">

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
            <div class="relative mb-8 px-6 py-4 rounded-[2rem] text-center overflow-hidden"
                style="background: linear-gradient(135deg, rgba(236, 227, 219, 0.4), rgba(245, 238, 232, 0.6)); border: 1px solid rgba(230, 215, 200, 0.3);">
                <p class="text-sm font-light leading-relaxed" style="color: #4f4842;">
                    💛 每一个声音都值得被听见。你的分享，或许正是此刻某个人需要的光。
                </p>
                <div class="flex items-center justify-center gap-3 mt-2">
                    <span class="text-xs font-light" style="color: #8a7e74;">✨ 勇敢发声</span>
                    <span class="w-px h-3" style="background: #dccfc4;"></span>
                    <span class="text-xs font-light" style="color: #8a7e74;">🌱 温暖传递</span>
                    <span class="w-px h-3" style="background: #dccfc4;"></span>
                    <span class="text-xs font-light" style="color: #8a7e74;">🫂 彼此照亮</span>
                </div>
            </div>

            <!-- ====== 三栏 Flex 布局 ====== -->
            <div class="flex gap-5 items-start">

                <!-- ====== 左侧：便签栏 ====== -->
                <div class="hidden lg:block w-[180px] flex-shrink-0 space-y-3">
                    <!-- 加载状态 -->
                    <div v-if="loading && leftStickies.length === 0" class="text-center py-6">
                        <div
                            class="w-6 h-6 border-2 border-t-warm-500 border-warm-200 rounded-full animate-spin mx-auto">
                        </div>
                        <span class="text-xs font-light mt-2 block" style="color: #b8aa98;">加载中...</span>
                    </div>

                    <!-- 便签列表 -->
                    <div v-for="item in leftStickies" :key="item.id" class="p-3 transition-all rounded-2xl" :style="{
                        background: item.color || 'rgba(255, 250, 245, 0.6)',
                        border: '1px solid #efe7e0',
                    }" @mouseenter="e => {
                        e.currentTarget.style.borderColor = '#dfd2c6';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(150, 130, 110, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }" @mouseleave="e => {
                        e.currentTarget.style.borderColor = '#efe7e0';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }">
                        <div class="flex items-start justify-between mb-1">
                            <span class="text-sm">{{ item.icon || '📌' }}</span>
                            <span class="text-[10px] font-light" style="color: #b8aa98;">{{ formatTime(item.createdAt)
                            }}</span>
                        </div>
                        <p class="text-xs font-light leading-relaxed"
                            style="color: #4b423c; line-height: 1.5; word-break: break-word;">{{ item.content }}</p>
                        <div class="flex items-center justify-between mt-1.5 pt-1"
                            style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                            <button @click="likeSticky(item.id)"
                                class="text-[10px] font-light transition-colors flex items-center gap-1"
                                style="color: #8a7e74;" @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                💛 {{ item.likes }}
                            </button>
                            <div class="flex items-center gap-1.5">
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.username || '匿名用户'
                                }}</span>
                                <!-- ✅ 删除按钮（仅自己的便签） -->
                                <button v-if="isMySticky(item)" @click="confirmDeleteSticky(item.id)"
                                    class="text-[10px] font-light transition-colors" style="color: #b8aa98;"
                                    @mouseenter="e => e.currentTarget.style.color = '#e85a65'"
                                    @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 空状态 -->
                    <div v-if="!loading && leftStickies.length === 0" class="text-center py-6"
                        style="border: 1px dashed #e7dbd0; border-radius: 1.5rem;">
                        <span class="text-2xl block mb-1">📌</span>
                        <span class="text-xs font-light" style="color: #b8aa98;">便签会出现在这里</span>
                    </div>
                </div>

                <!-- ====== 中间：帖子 ====== -->
                <div class="flex-1 min-w-0">

                    <!-- 分类筛选 -->
                    <div class="flex flex-wrap gap-2 mb-5">
                        <button v-for="cat in postCategories" :key="cat.value" @click="selectedCategory = cat.value"
                            class="px-4 py-1.5 text-xs font-light transition-all rounded-full" :style="selectedCategory === cat.value
                                ? 'background: rgba(236, 227, 219, 0.6); color: #4f4842; border: 1px solid #dccfc4;'
                                : 'background: transparent; color: #8a7e74; border: 1px solid transparent;'"
                            @mouseenter="e => { if (selectedCategory !== cat.value) { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.background = 'rgba(245, 238, 232, 0.3)'; } }"
                            @mouseleave="e => { if (selectedCategory !== cat.value) { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; } }">
                            {{ cat.icon }} {{ cat.label }}
                        </button>
                    </div>

                    <!-- 加载状态 -->
                    <div v-if="loading && filteredPosts.length === 0" class="text-center py-16"
                        style="background: rgba(255, 250, 245, 0.3); border-radius: 3rem; border: 1px dashed #e7dbd0;">
                        <div
                            class="w-10 h-10 border-2 border-t-warm-500 border-warm-200 rounded-full animate-spin mx-auto">
                        </div>
                        <p class="text-sm font-light mt-4" style="color: #8a7e74;">加载中...</p>
                    </div>

                    <!-- 空状态 -->
                    <div v-else-if="filteredPosts.length === 0" class="text-center py-16"
                        style="background: rgba(255, 250, 245, 0.3); border-radius: 3rem; border: 1px dashed #e7dbd0;">
                        <div class="text-5xl mb-4">🌱</div>
                        <p class="text-sm font-light" style="color: #8a7e74;">
                            {{ selectedCategory === 'all' ? '还没有帖子' : '该分类下暂无帖子' }}
                        </p>
                        <p class="text-xs font-light mt-1" style="color: #b8aa98;">
                            {{ selectedCategory === 'all' ? '成为第一个分享抵抗方法的人吧' : '试试其他分类吧' }}
                        </p>
                    </div>

                    <!-- 帖子列表 -->
                    <div v-else class="space-y-4">
                        <div v-for="post in filteredPosts" :key="post.id" class="p-6 transition-all rounded-[2.5rem]"
                            style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.06)'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">

                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <!-- 标题行 -->
                                    <div class="flex items-center gap-3 mb-2">
                                        <span class="text-lg">{{ post.icon || '📖' }}</span>
                                        <h3 class="text-base font-light" style="color: #4f4842;">{{ post.title }}</h3>
                                        <span class="px-2 py-0.5 text-[10px] rounded-full"
                                            style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0; flex-shrink: 0;">{{
                                                post.category }}</span>
                                    </div>

                                    <!-- 内容 -->
                                    <p class="text-sm font-light leading-relaxed whitespace-pre-line"
                                        style="color: #6d6259;">
                                        {{ truncateSmart(truncateByLines(stripMarkdown(post.content), 3)) }}
                                    </p>

                                    <!-- 查看详情 -->
                                    <div v-if="post.content.length > 100 || post.content.split('\n').length > 3"
                                        class="mt-2">
                                        <button @click="viewPostDetail(post.id)"
                                            class="text-xs font-light transition-colors flex items-center gap-1"
                                            style="color: #8a7e74;"
                                            @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                            @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                            查看详情 →
                                        </button>
                                    </div>

                                    <!-- 底部信息 -->
                                    <div class="flex flex-wrap items-center gap-4 mt-3 pt-2"
                                        style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                                        <span class="text-xs font-light" style="color: #8a7e74;">👤 {{ post.username ||
                                            '匿名用户' }}</span>
                                        <span class="text-xs font-light" style="color: #b8aa98;">{{
                                            formatTime(post.createdAt) }}</span>

                                        <!-- 点赞按钮 -->
                                        <button @click="likePost(post.id)"
                                            class="text-xs font-light transition-colors flex items-center gap-1"
                                            style="color: #8a7e74;"
                                            @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                            @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                            💛 {{ post.likes }}
                                        </button>

                                        <span class="text-xs font-light" style="color: #8a7e74;">💬 {{ post.comments ||
                                            0 }}</span>

                                        <!-- 删除按钮（仅自己的帖子） -->
                                        <button v-if="isMyPost(post)" @click="confirmDeletePost(post.id)"
                                            class="text-xs font-light transition-colors flex items-center gap-1 ml-auto"
                                            style="color: #b8aa98;"
                                            @mouseenter="e => e.currentTarget.style.color = '#e85a65'"
                                            @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">
                                            🗑️ 删除
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 加载更多 -->
                    <div v-if="hasMore" class="text-center mt-6">
                        <button @click="loadMore" :disabled="loadingMore"
                            class="px-8 py-2 text-sm font-light transition-all rounded-full"
                            style="color: #8a7e74; border: 1px solid #e7dbd0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.color = '#4f4842'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.color = '#8a7e74'; }">
                            {{ loadingMore ? '加载中...' : '加载更多' }}
                        </button>
                    </div>
                </div>

                <!-- ====== 右侧：便签栏 ====== -->
                <div class="hidden lg:block w-[180px] flex-shrink-0 space-y-3">
                    <!-- 加载状态 -->
                    <div v-if="loading && rightStickies.length === 0" class="text-center py-6">
                        <div
                            class="w-6 h-6 border-2 border-t-warm-500 border-warm-200 rounded-full animate-spin mx-auto">
                        </div>
                        <span class="text-xs font-light mt-2 block" style="color: #b8aa98;">加载中...</span>
                    </div>

                    <!-- 便签列表 -->
                    <div v-for="item in rightStickies" :key="item.id" class="p-3 transition-all rounded-2xl" :style="{
                        background: item.color || 'rgba(255, 250, 245, 0.6)',
                        border: '1px solid #efe7e0',
                    }" @mouseenter="e => {
                        e.currentTarget.style.borderColor = '#dfd2c6';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(150, 130, 110, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }" @mouseleave="e => {
                        e.currentTarget.style.borderColor = '#efe7e0';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }">
                        <div class="flex items-start justify-between mb-1">
                            <span class="text-sm">{{ item.icon || '📌' }}</span>
                            <span class="text-[10px] font-light" style="color: #b8aa98;">{{ formatTime(item.createdAt)
                            }}</span>
                        </div>
                        <p class="text-xs font-light leading-relaxed"
                            style="color: #4b423c; line-height: 1.5; word-break: break-word;">{{ item.content }}</p>
                        <div class="flex items-center justify-between mt-1.5 pt-1"
                            style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                            <button @click="likeSticky(item.id)"
                                class="text-[10px] font-light transition-colors flex items-center gap-1"
                                style="color: #8a7e74;" @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                💛 {{ item.likes }}
                            </button>
                            <div class="flex items-center gap-1.5">
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.username || '匿名用户'
                                }}</span>
                                <!-- ✅ 删除按钮（仅自己的便签） -->
                                <button v-if="isMySticky(item)" @click="confirmDeleteSticky(item.id)"
                                    class="text-[10px] font-light transition-colors" style="color: #b8aa98;"
                                    @mouseenter="e => e.currentTarget.style.color = '#e85a65'"
                                    @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 空状态 -->
                    <div v-if="!loading && rightStickies.length === 0" class="text-center py-6"
                        style="border: 1px dashed #e7dbd0; border-radius: 1.5rem;">
                        <span class="text-2xl block mb-1">📌</span>
                        <span class="text-xs font-light" style="color: #b8aa98;">便签会出现在这里</span>
                    </div>
                </div>

            </div>

            <!-- ====== 移动端：便签折叠 ====== -->
            <div class="lg:hidden mt-8">
                <details class="group">
                    <summary class="flex items-center gap-2 cursor-pointer text-sm font-light"
                        style="color: #8a7e74; list-style: none;"
                        @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                        @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                        <span>📌</span> 查看便签
                        <span class="text-xs transition-transform group-open:rotate-180">▼</span>
                        <span class="text-xs font-light" style="color: #b8aa98;">{{ filteredStickies.length }}</span>
                    </summary>
                    <div class="grid grid-cols-2 gap-3 mt-3">
                        <div v-for="item in filteredStickies" :key="item.id" class="p-3 transition-all rounded-2xl"
                            :style="{
                                background: item.color || 'rgba(255, 250, 245, 0.6)',
                                border: '1px solid #efe7e0',
                            }">
                            <div class="flex items-start justify-between mb-1">
                                <span class="text-sm">{{ item.icon || '📌' }}</span>
                                <span class="text-[10px] font-light" style="color: #b8aa98;">{{
                                    formatTime(item.createdAt) }}</span>
                            </div>
                            <p class="text-xs font-light leading-relaxed"
                                style="color: #4b423c; word-break: break-word;">{{ item.content }}</p>
                            <div class="flex items-center justify-between mt-1.5 pt-1"
                                style="border-top: 1px solid rgba(231, 219, 208, 0.3);">
                                <button @click="likeSticky(item.id)"
                                    class="text-[10px] font-light transition-colors flex items-center gap-1"
                                    style="color: #8a7e74;" @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                                    @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                                    💛 {{ item.likes }}
                                </button>
                                <div class="flex items-center gap-1.5">
                                    <span class="text-[10px] font-light" style="color: #b8aa98;">{{ item.username ||
                                        '匿名用户' }}</span>
                                    <button v-if="isMySticky(item)" @click="confirmDeleteSticky(item.id)"
                                        class="text-[10px] font-light transition-colors" style="color: #b8aa98;"
                                        @mouseenter="e => e.currentTarget.style.color = '#e85a65'"
                                        @mouseleave="e => e.currentTarget.style.color = '#b8aa98'">
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
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
                    <!-- 标题 -->
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">标题</label>
                        <input v-model="postTitle" type="text"
                            class="w-full p-3 text-sm transition-all rounded-[1.5rem]"
                            style="background: rgba(245, 238, 232, 0.3); border: 1px solid #e7dbd0; color: #4b423c; font-weight: 300; font-family: 'Segoe UI', sans-serif;"
                            placeholder="给你的方法起个标题..." @focus="e => e.currentTarget.style.borderColor = '#dccfc4'"
                            @blur="e => e.currentTarget.style.borderColor = '#e7dbd0'" />
                    </div>

                    <!-- 分类 -->
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

                    <!-- ✅ Markdown 编辑器 -->
                    <div>
                        <label class="text-xs font-light block mb-1.5" style="color: #6d6259;">内容</label>
                        <MarkdownEditor v-model="postContent" placeholder="详细分享你的经验和方法... 支持 Markdown 语法" />
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <button @click="submitShare" :disabled="submitting"
                        class="flex-1 py-2.5 text-sm font-light transition-all rounded-full disabled:opacity-50"
                        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                        @mouseenter="e => { if (!submitting) { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; } }"
                        @mouseleave="e => { if (!submitting) { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; } }">
                        {{ submitting ? '发布中...' : '发布分享' }}
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

        <!-- ====== 删除确认弹窗（帖子） ====== -->
        <div v-if="showDeletePostModal" class="fixed inset-0 z-50 flex items-center justify-center px-4"
            style="background: rgba(44, 36, 28, 0.3); backdrop-filter: blur(4px);">
            <div class="w-full max-w-sm p-6 rounded-[2.5rem] text-center"
                style="background: rgba(255, 250, 245, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(230, 215, 200, 0.3); box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);">
                <div class="text-4xl mb-4">🗑️</div>
                <h3 class="text-lg font-light tracking-wide" style="color: #4f4842;">确认删除帖子</h3>
                <p class="text-sm font-light mt-2" style="color: #6d6259;">确定要删除这篇帖子吗？此操作不可撤销。</p>
                <div class="flex gap-3 mt-6">
                    <button @click="deletePost" class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #e85a65; color: white; border: 1px solid #e85a65;"
                        @mouseenter="e => e.currentTarget.style.background = '#cc404a'"
                        @mouseleave="e => e.currentTarget.style.background = '#e85a65'">
                        确认删除
                    </button>
                    <button @click="closeDeletePostModal"
                        class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: transparent; color: #8a7e74; border: 1px solid #e7dbd0;"
                        @mouseenter="e => { e.currentTarget.style.borderColor = '#dccfc4'; e.currentTarget.style.color = '#4f4842'; }"
                        @mouseleave="e => { e.currentTarget.style.borderColor = '#e7dbd0'; e.currentTarget.style.color = '#8a7e74'; }">
                        取消
                    </button>
                </div>
            </div>
        </div>

        <!-- ====== 删除确认弹窗（便签） ====== -->
        <div v-if="showDeleteStickyModal" class="fixed inset-0 z-50 flex items-center justify-center px-4"
            style="background: rgba(44, 36, 28, 0.3); backdrop-filter: blur(4px);">
            <div class="w-full max-w-sm p-6 rounded-[2.5rem] text-center"
                style="background: rgba(255, 250, 245, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(230, 215, 200, 0.3); box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);">
                <div class="text-4xl mb-4">📌</div>
                <h3 class="text-lg font-light tracking-wide" style="color: #4f4842;">确认删除便签</h3>
                <p class="text-sm font-light mt-2" style="color: #6d6259;">确定要删除这条便签吗？此操作不可撤销。</p>
                <div class="flex gap-3 mt-6">
                    <button @click="deleteSticky" class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #e85a65; color: white; border: 1px solid #e85a65;"
                        @mouseenter="e => e.currentTarget.style.background = '#cc404a'"
                        @mouseleave="e => e.currentTarget.style.background = '#e85a65'">
                        确认删除
                    </button>
                    <button @click="closeDeleteStickyModal"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { postService, stickyService, type PostResponse, type StickyResponse } from '@/services'
import { truncateByLines, truncateSmart, stripMarkdown } from '@/utils/text'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

const router = useRouter()
const userStore = useUserStore()

// ====== 状态 ======
const loading = ref(true)
const loadingMore = ref(false)
const submitting = ref(false)

const posts = ref<PostResponse[]>([])
const stickies = ref<StickyResponse[]>([])
const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 1,
})

// ====== 删除帖子相关 ======
const showDeletePostModal = ref(false)
const deletePostId = ref<string | null>(null)

// ====== 删除便签相关 ======
const showDeleteStickyModal = ref(false)
const deleteStickyId = ref<string | null>(null)

// ====== 分类筛选 ======
const selectedCategory = ref('all')
const postCategories = ref([
    { value: 'all', label: '全部', icon: '✦' },
    { value: '心理调节', label: '心理调节', icon: '🧠' },
    { value: '生活习惯', label: '生活习惯', icon: '🌱' },
    { value: '社交支持', label: '社交支持', icon: '🤝' },
    { value: '专业帮助', label: '专业帮助', icon: '💼' },
    { value: '日常小技巧', label: '日常小技巧', icon: '✨' },
])

// ====== 便签 ======
const filteredStickies = computed(() => stickies.value)

const leftStickies = computed(() => {
    return filteredStickies.value.filter((_, i) => i % 2 === 0)
})

const rightStickies = computed(() => {
    return filteredStickies.value.filter((_, i) => i % 2 === 1)
})

// ====== 帖子 ======
const filteredPosts = computed(() => {
    if (selectedCategory.value === 'all') {
        return posts.value
    }
    return posts.value.filter(p => p.category === selectedCategory.value)
})

const hasMore = computed(() => {
    return pagination.value.page < pagination.value.totalPages
})

// ====== 判断是否为自己的帖子 ======
const isMyPost = (post: PostResponse): boolean => {
    const currentUser = userStore.user?.username
    return currentUser ? post.username === currentUser : false
}

// ====== 判断是否为自己的便签 ======
const isMySticky = (sticky: StickyResponse): boolean => {
    const currentUser = userStore.user?.username
    return currentUser ? sticky.username === currentUser : false
}

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

// ====== 加载数据 ======
const loadData = async () => {
    loading.value = true
    try {
        const [postsResult, stickiesResult] = await Promise.all([
            postService.getPosts('all', 1, 20),
            stickyService.getStickies(20),
        ])
        posts.value = postsResult.data
        pagination.value = postsResult.pagination
        stickies.value = stickiesResult
    } catch (error) {
        console.error('加载社区数据失败:', error)
    } finally {
        loading.value = false
    }
}

const loadMore = async () => {
    if (loadingMore.value || !hasMore.value) return

    loadingMore.value = true
    try {
        const nextPage = pagination.value.page + 1
        const result = await postService.getPosts(
            selectedCategory.value === 'all' ? undefined : selectedCategory.value,
            nextPage,
            pagination.value.pageSize
        )
        posts.value = [...posts.value, ...result.data]
        pagination.value = result.pagination
    } catch (error) {
        console.error('加载更多失败:', error)
    } finally {
        loadingMore.value = false
    }
}

// ====== 分类切换 ======
const onCategoryChange = async (category: string) => {
    selectedCategory.value = category
    pagination.value.page = 1
    loading.value = true
    try {
        const result = await postService.getPosts(
            category === 'all' ? undefined : category,
            1,
            pagination.value.pageSize
        )
        posts.value = result.data
        pagination.value = result.pagination
    } catch (error) {
        console.error('切换分类加载失败:', error)
    } finally {
        loading.value = false
    }
}

watch(selectedCategory, (newVal) => {
    if (!loading.value) {
        onCategoryChange(newVal)
    }
})

// ====== 点赞帖子 ======
const likePost = async (id: string) => {
    try {
        const result = await postService.likePost(id)
        const post = posts.value.find(p => p.id === id)
        if (post) post.likes = result.likes
    } catch (error) {
        console.error('点赞失败:', error)
    }
}

// ====== 点赞便签 ======
const likeSticky = async (id: string) => {
    try {
        const result = await stickyService.likeSticky(id)
        const sticky = stickies.value.find(s => s.id === id)
        if (sticky) sticky.likes = result.likes
    } catch (error) {
        console.error('点赞便签失败:', error)
    }
}

// ====== 删除帖子 ======
const confirmDeletePost = (id: string) => {
    deletePostId.value = id
    showDeletePostModal.value = true
}

const closeDeletePostModal = () => {
    showDeletePostModal.value = false
    deletePostId.value = null
}

const deletePost = async () => {
    if (!deletePostId.value) return

    try {
        await postService.deletePost(deletePostId.value)
        posts.value = posts.value.filter(p => p.id !== deletePostId.value)
        closeDeletePostModal()
    } catch (error) {
        console.error('删除帖子失败:', error)
        alert('删除失败，请重试')
    }
}

// ====== 删除便签 ======
const confirmDeleteSticky = (id: string) => {
    deleteStickyId.value = id
    showDeleteStickyModal.value = true
}

const closeDeleteStickyModal = () => {
    showDeleteStickyModal.value = false
    deleteStickyId.value = null
}

const deleteSticky = async () => {
    if (!deleteStickyId.value) return

    try {
        await stickyService.deleteSticky(deleteStickyId.value)
        stickies.value = stickies.value.filter(s => s.id !== deleteStickyId.value)
        closeDeleteStickyModal()
    } catch (error) {
        console.error('删除便签失败:', error)
        alert('删除失败，请重试')
    }
}

// ====== 查看详情 ======
const viewPostDetail = (postId: string) => {
    router.push(`/community/post/${postId}`)
}

// ====== 创建分享弹窗 ======
const showCreateModal = ref(false)
const shareType = ref<'sticky' | 'post'>('sticky')

const shareTypes = ref([
    { value: 'sticky', icon: '📌', label: '便签' },
    { value: 'post', icon: '📖', label: '帖子' },
])

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

const postTitle = ref('')
const postCategory = ref('心理调节')
const postContent = ref('')

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

const submitShare = async () => {
    if (shareType.value === 'sticky') {
        if (!stickyContent.value.trim()) {
            alert('请写下你的便签内容')
            return
        }
        submitting.value = true
        try {
            const newSticky = await stickyService.createSticky({
                content: stickyContent.value.trim(),
                icon: selectedIcon.value,
                color: selectedColor.value,
            })
            stickies.value.unshift(newSticky)
            closeModal()
        } catch (error) {
            console.error('发布便签失败:', error)
            alert('发布失败，请重试')
        } finally {
            submitting.value = false
        }
    } else {
        if (!postTitle.value.trim() || !postContent.value.trim()) {
            alert('请填写标题和内容')
            return
        }
        submitting.value = true
        try {
            const newPost = await postService.createPost({
                title: postTitle.value.trim(),
                content: postContent.value.trim(),
                category: postCategory.value,
                icon: '📖',
            })
            posts.value.unshift(newPost)
            closeModal()
        } catch (error) {
            console.error('发布帖子失败:', error)
            alert('发布失败，请重试')
        } finally {
            submitting.value = false
        }
    }
}

// ====== 生命周期 ======
onMounted(() => {
    userStore.restoreUser()
    loadData()
})
</script>

<style scoped>
/* ====== 滚动条美化 ====== */
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

/* ====== 移动端折叠面板 ====== */
details summary {
    list-style: none;
}

details summary::-webkit-details-marker {
    display: none;
}

/* ====== 旋转动画 ====== */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 0.8s linear infinite;
}
</style>