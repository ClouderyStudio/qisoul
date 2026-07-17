<template>
  <header
    class="fixed top-0 left-0 right-0 z-50"
    style="
      background: rgba(255, 250, 245, 0.75);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(230, 215, 200, 0.3);
    "
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3">
        <div
          class="w-9 h-9 flex items-center justify-center rounded-full"
          style="background: rgba(236, 227, 219, 0.6)"
        >
          <svg
            class="w-5 h-5"
            style="color: #8a7e74"
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
          style="color: #4f4842; letter-spacing: -0.5px"
          >栖所</span
        >
      </router-link>

      <!-- 导航链接 -->
      <div class="hidden md:flex items-center gap-8 text-sm font-light">
        <router-link
          to="/"
          class="transition-colors duration-200"
          :style="{
            color: isActive('/') ? '#4f4842' : '#8a7e74',
            borderBottom: isActive('/')
              ? '2px solid #dccfc4'
              : '2px solid transparent',
            paddingBottom: '4px',
          }"
          @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
          @mouseleave="
            (e) =>
              (e.currentTarget.style.color = isActive('/')
                ? '#4f4842'
                : '#8a7e74')
          "
        >
          首页
        </router-link>
        <router-link
          to="/dashboard"
          class="transition-colors duration-200"
          :style="{
            color: isActive('/dashboard') ? '#4f4842' : '#8a7e74',
            borderBottom: isActive('/dashboard')
              ? '2px solid #dccfc4'
              : '2px solid transparent',
            paddingBottom: '4px',
          }"
          @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
          @mouseleave="
            (e) =>
              (e.currentTarget.style.color = isActive('/dashboard')
                ? '#4f4842'
                : '#8a7e74')
          "
        >
          仪表盘
        </router-link>
        <router-link
          to="/community"
          class="transition-colors duration-200"
          :style="{
            color: isActive('/community') ? '#4f4842' : '#8a7e74',
            borderBottom: isActive('/community')
              ? '2px solid #dccfc4'
              : '2px solid transparent',
            paddingBottom: '4px',
          }"
          @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
          @mouseleave="
            (e) =>
              (e.currentTarget.style.color = isActive('/community')
                ? '#4f4842'
                : '#8a7e74')
          "
        >
          社区
        </router-link>
        <router-link
          to="/resources"
          class="transition-colors duration-200"
          :style="{
            color: isActive('/resources') ? '#4f4842' : '#8a7e74',
            borderBottom: isActive('/resources')
              ? '2px solid #dccfc4'
              : '2px solid transparent',
            paddingBottom: '4px',
          }"
          @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
          @mouseleave="
            (e) =>
              (e.currentTarget.style.color = isActive('/resources')
                ? '#4f4842'
                : '#8a7e74')
          "
        >
          资源
        </router-link>
      </div>

      <!-- 用户操作 -->
      <div class="flex items-center gap-3 sm:gap-4">
        <template v-if="userStore.isAuthenticated">
          <router-link
            to="/dashboard"
            class="flex items-center gap-2 text-sm font-light transition-colors"
            style="color: #6d6259"
            @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
            @mouseleave="(e) => (e.currentTarget.style.color = '#6d6259')"
          >
            <img
              :src="userStore.getAvatar || '/default-avatar.png'"
              alt="头像"
              class="w-7 h-7 rounded-full object-cover"
              style="border: 1px solid #dccfc4"
            />
            <span class="hidden sm:inline">{{ userStore.getUsername }}</span>
          </router-link>
          <button
            @click="handleLogout"
            class="text-sm font-light transition-colors"
            style="color: #8a7e74"
            @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
            @mouseleave="(e) => (e.currentTarget.style.color = '#8a7e74')"
          >
            退出
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-sm font-light transition-colors"
            style="color: #8a7e74"
            @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
            @mouseleave="(e) => (e.currentTarget.style.color = '#8a7e74')"
            >登录</router-link
          >
          <router-link
            to="/login"
            class="px-5 py-1.5 text-sm font-light transition-all rounded-full"
            style="
              background: #ece3db;
              color: #4d443d;
              border: 1px solid #e2d5ca;
            "
            @mouseenter="
              (e) => {
                e.currentTarget.style.background = '#e0d3c8';
                e.currentTarget.style.borderColor = '#cebdb0';
              }
            "
            @mouseleave="
              (e) => {
                e.currentTarget.style.background = '#ece3db';
                e.currentTarget.style.borderColor = '#e2d5ca';
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

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};

const handleLogout = async () => {
  await userStore.logout();
  router.push("/");
};
</script>
