<template>
    <div class="pt-20 pb-8">
        <div class="max-w-6xl mx-auto px-6">
            <!-- 英雄区 -->
            <section class="text-center py-12">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                    style="background: rgba(236, 227, 219, 0.4); border: 1px solid rgba(230, 215, 200, 0.3);">
                    <span class="w-1.5 h-1.5 rounded-full" style="background: #dccfc4;"></span>
                    <span class="text-[10px] tracking-widest font-light" style="color: #8a7e74;">安静 · 温和 · 长久</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-[1.15]"
                    style="color: #4f4842; letter-spacing: -0.5px;">
                    你不必
                    <span style="color: #8a7e74; border-bottom: 2px solid #dccfc4;">独自承受</span>
                </h1>

                <p class="mt-5 text-sm font-light max-w-sm mx-auto leading-relaxed" style="color: #6d6259;">
                    一个安静的心灵栖息地。记录心情，分享故事，<br class="hidden sm:block">
                    在理解中找到力量。
                </p>

                <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <router-link to="/login" class="px-7 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                        @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                        @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                        开始使用
                    </router-link>
                    <a href="#features" class="px-7 py-2.5 text-sm font-light transition-all rounded-full"
                        style="color: #8a7e74; border: 1px solid #e7dbd0;"
                        @mouseenter="e => { e.currentTarget.style.color = '#4f4842'; e.currentTarget.style.borderColor = '#dccfc4'; }"
                        @mouseleave="e => { e.currentTarget.style.color = '#8a7e74'; e.currentTarget.style.borderColor = '#e7dbd0'; }">
                        了解功能
                    </a>
                </div>

                <div class="mt-16 flex items-center justify-center gap-10 text-xs font-light">
                    <div class="text-center"><span class="block text-xl font-light"
                            style="color: #4f4842;">5000+</span><span style="color: #8a7e74;">注册用户</span></div>
                    <div class="w-px h-10" style="background: #e7dbd0;"></div>
                    <div class="text-center"><span class="block text-xl font-light"
                            style="color: #4f4842;">3万+</span><span style="color: #8a7e74;">心情记录</span></div>
                    <div class="w-px h-10" style="background: #e7dbd0;"></div>
                    <div class="text-center"><span class="block text-xl font-light"
                            style="color: #4f4842;">98%</span><span style="color: #8a7e74;">用户满意度</span></div>
                </div>
            </section>

            <!-- 功能 -->
            <section id="features" class="py-16">
                <div class="text-center mb-12">
                    <span class="text-[10px] tracking-[0.15em] uppercase font-light" style="color: #8a7e74;">核心功能</span>
                    <h2 class="text-2xl font-light tracking-wide mt-2" style="color: #4f4842;">为你而生的温暖工具</h2>
                    <div class="w-12 h-px mx-auto mt-3" style="background: #dccfc4;"></div>
                </div>

                <div class="grid md:grid-cols-3 gap-5">
                    <div v-for="item in features" :key="item.title"
                        class="p-7 text-center transition-all rounded-[2.5rem]"
                        style="background: rgba(255, 250, 245, 0.6); backdrop-filter: blur(2px); border: 1px solid #efe7e0;"
                        @mouseenter="e => { e.currentTarget.style.background = 'rgba(255, 252, 248, 0.8)'; e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(150, 130, 110, 0.06)'; e.currentTarget.style.transform = 'translateY(-3px)'; }"
                        @mouseleave="e => { e.currentTarget.style.background = 'rgba(255, 250, 245, 0.6)'; e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }">
                        <div class="text-3xl mb-4">{{ item.icon }}</div>
                        <h3 class="text-base font-light" style="color: #4f4842;">{{ item.title }}</h3>
                        <p class="text-xs mt-1.5 leading-relaxed font-light" style="color: #6d6259;">{{ item.desc }}</p>
                    </div>
                </div>
            </section>

            <!-- 每日小语 -->
            <section class="py-8">
                <div class="relative py-10 px-6 rounded-[3rem]"
                    style="background: rgba(245, 238, 232, 0.4); backdrop-filter: blur(2px); border-left: 6px solid #dccfc4;">
                    <div class="absolute -top-3 left-8 text-4xl" style="color: #dccfc4; font-family: 'Georgia', serif;">
                        "</div>
                    <div class="absolute -bottom-3 right-8 text-4xl"
                        style="color: #dccfc4; font-family: 'Georgia', serif;">"</div>
                    <p class="text-sm leading-relaxed max-w-sm mx-auto text-center font-light"
                        style="color: #4b423c; font-style: italic;">
                        {{ dailyQuote.text }}
                    </p>
                    <p class="text-xs text-center mt-4 font-light" style="color: #8a7e74;">— {{ dailyQuote.author }}</p>
                </div>
            </section>

            <!-- 社区预告 -->
            <section id="community" class="py-16">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <span class="text-[10px] tracking-[0.15em] uppercase font-light"
                            style="color: #8a7e74;">安心社区</span>
                        <h2 class="text-2xl font-light tracking-wide mt-2" style="color: #4f4842;">在分享中治愈彼此</h2>
                        <p class="text-sm mt-3 leading-relaxed font-light" style="color: #6d6259;">
                            匿名分享你的故事，用心倾听他人的声音。<br>
                            每一个声音都值得被听见。
                        </p>
                        <div class="flex flex-wrap gap-2 mt-4">
                            <span class="px-3 py-1 text-[10px] font-light rounded-full"
                                style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0;">匿名分享</span>
                            <span class="px-3 py-1 text-[10px] font-light rounded-full"
                                style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0;">互助倾听</span>
                            <span class="px-3 py-1 text-[10px] font-light rounded-full"
                                style="background: rgba(236, 227, 219, 0.4); color: #6d6259; border: 1px solid #e7dbd0;">暖心回应</span>
                        </div>
                        <router-link to="/community"
                            class="inline-flex items-center gap-2 mt-4 text-sm font-light transition-colors"
                            style="color: #8a7e74;" @mouseenter="e => e.currentTarget.style.color = '#4f4842'"
                            @mouseleave="e => e.currentTarget.style.color = '#8a7e74'">
                            进入社区 →
                        </router-link>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div v-for="item in resources" :key="item.title"
                            class="p-4 text-center transition-all rounded-[2rem]"
                            style="background: rgba(255, 250, 245, 0.6); border: 1px solid #efe7e0;"
                            @mouseenter="e => { e.currentTarget.style.borderColor = '#dfd2c6'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(150, 130, 110, 0.04)'; }"
                            @mouseleave="e => { e.currentTarget.style.borderColor = '#efe7e0'; e.currentTarget.style.boxShadow = 'none'; }">
                            <div class="text-2xl mb-1">{{ item.icon }}</div>
                            <div class="text-xs font-light" style="color: #4f4842;">{{ item.title }}</div>
                            <div class="text-[10px] font-light" style="color: #8a7e74;">{{ item.count }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section class="py-12 text-center">
                <div class="py-10 px-6 rounded-[3rem]"
                    style="background: rgba(245, 238, 232, 0.3); border: 1px solid #efe7e0;">
                    <h2 class="text-2xl font-light tracking-wide" style="color: #4f4842;">准备开始了吗？</h2>
                    <p class="text-sm mt-2 font-light" style="color: #6d6259;">加入栖所，我们都在这里陪着你。</p>
                    <router-link to="/login"
                        class="inline-block mt-6 px-8 py-2.5 text-sm font-light transition-all rounded-full"
                        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca;"
                        @mouseenter="e => { e.currentTarget.style.background = '#e0d3c8'; e.currentTarget.style.borderColor = '#cebdb0'; }"
                        @mouseleave="e => { e.currentTarget.style.background = '#ece3db'; e.currentTarget.style.borderColor = '#e2d5ca'; }">
                        立即加入
                    </router-link>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const features = ref([
    { icon: '📝', title: '心情记录', desc: '每天几分钟，看见自己的情绪变化' },
    { icon: '📊', title: '情绪趋势', desc: '直观图表，了解情绪波动规律' },
    { icon: '💬', title: '安心社区', desc: '匿名分享，在倾听中获得力量' },
])

const resources = ref([
    { icon: '🧘', title: '冥想引导', count: '12 个' },
    { icon: '🎵', title: '舒缓音乐', count: '8 首' },
    { icon: '📚', title: '心理书单', count: '25 本' },
    { icon: '💡', title: '温暖贴士', count: '36 条' },
])

const dailyQuote = ref({
    text: '你并非孤岛。在这广阔的世界里，总有人愿意倾听你、理解你。',
    author: '栖所 · 致每一个你'
})
</script>