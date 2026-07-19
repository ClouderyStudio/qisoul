<template>
  <header
    class="fixed top-0 left-0 right-0 z-50"
    style="
      background: var(--c-nav-bg);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--c-border-1);
    "
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3">
        <div
          class="w-9 h-9 flex items-center justify-center rounded-full"
          style="background: var(--c-accent-light)"
        >
          <svg
            class="w-5 h-5"
            style="color: var(--c-text-3)"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              d="M12 22s-8-4.5-8-11.8A6.2 6.2 0 0 1 10.2 4c1.1 0 2.1.4 2.9 1.1.8-.7 1.8-1.1 2.9-1.1A6.2 6.2 0 0 1 20 10.2C20 17.5 12 22 12 22z"
            />
          </svg>
        </div>
        <span
          class="text-xl font-light tracking-wide"
          style="color: var(--c-text-1); letter-spacing: -0.5px"
          >栖所</span
        >
      </router-link>

      <!-- 导航链接 -->
      <div class="hidden md:flex items-center gap-8 text-sm font-light">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-200"
          :style="{
            color: isActive(link.to) ? 'var(--c-text-1)' : 'var(--c-text-3)',
            borderBottom: isActive(link.to)
              ? '2px solid var(--c-accent)'
              : '2px solid transparent',
            paddingBottom: '4px',
          }"
          @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e: any) =>
            (e.currentTarget.style.color = isActive(link.to)
              ? 'var(--c-text-1)'
              : 'var(--c-text-3)')"
        >
          {{ link.label }}
        </router-link>
      </div>

      <!-- 用户操作 -->
      <div class="flex items-center gap-3 sm:gap-4">
        <!-- 主题切换 -->
        <button
          @click="toggleTheme"
          class="text-lg transition-colors p-1 rounded-full"
          :style="{ color: 'var(--c-text-3)' }"
          :title="theme === 'light' ? '切换到深色模式' : '切换到浅色模式'"
          @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-3)')"
        >
          {{ theme === 'light' ? '🌙' : '☀️' }}
        </button>

        <template v-if="userStore.isAuthenticated">
          <router-link
            to="/dashboard"
            class="flex items-center gap-2 text-sm font-light transition-colors"
            style="color: var(--c-text-2)"
            @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
            @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-2)')"
          >
            <img
              :src="userStore.getAvatar || '/default-avatar.png'"
              alt="头像"
              class="w-7 h-7 rounded-full object-cover"
              style="border: 1px solid var(--c-accent)"
            />
            <span class="hidden sm:inline">{{ userStore.getUsername }}</span>
          </router-link>
          <button
            @click="handleLogout"
            class="text-sm font-light transition-colors"
            style="color: var(--c-text-3)"
            @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
            @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-3)')"
          >
            退出
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-sm font-light transition-colors"
            style="color: var(--c-text-3)"
            @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
            @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-3)')"
            >登录</router-link
          >
          <router-link
            to="/login"
            class="px-5 py-1.5 text-sm font-light transition-all rounded-full"
            style="
              background: var(--c-btn-bg);
              color: var(--c-text-btn);
              border: 1px solid var(--c-btn-border);
            "
            @mouseenter="
              (e: any) => {
                e.currentTarget.style.background = 'var(--c-btn-hover)';
                e.currentTarget.style.borderColor = 'var(--c-btn-border-hover)';
              }
            "
            @mouseleave="
              (e: any) => {
                e.currentTarget.style.background = 'var(--c-btn-bg)';
                e.currentTarget.style.borderColor = 'var(--c-btn-border)';
              }
            "
          >
            开始体验
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { useTheme } from "../composables/useTheme";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { theme, toggleTheme } = useTheme();

const navLinks = [
  { to: "/", label: "首页" },
  { to: "/dashboard", label: "仪表盘" },
  { to: "/community", label: "社区" },
  { to: "/resources", label: "资源" },
];

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};

const handleLogout = async () => {
  await userStore.logout();
  router.push("/");
};
</script>
