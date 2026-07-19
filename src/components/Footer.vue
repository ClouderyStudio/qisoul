<template>
  <footer
    class="max-w-6xl mx-auto px-6 py-6"
    style="border-top: 2px solid var(--c-border-2)"
  >
    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-light"
      style="color: var(--c-text-3)"
    >
      <span>© 2026 栖所 · 柔和叙事实验室</span>
      <div class="flex items-center gap-6">
        <router-link
          to="/about"
          class="transition-colors"
          style="color: var(--c-text-3)"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
          >关于</router-link
        >
        <router-link
          to="/privacy"
          class="transition-colors"
          style="color: var(--c-text-3)"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
          >隐私</router-link
        >
        <router-link
          to="/terms"
          class="transition-colors"
          style="color: var(--c-text-3)"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
          >条款</router-link
        >
        <router-link
          to="/help"
          class="transition-colors"
          style="color: var(--c-text-3)"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
          >帮助</router-link
        >
      </div>
      <span class="text-xs tracking-wider" style="color: var(--c-text-4)"
        >安静 · 温和 · 长久</span
      >
    </div>
  </footer>
</template>
