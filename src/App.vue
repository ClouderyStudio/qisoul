<template>
  <div class="min-h-screen" style="background: #f6f3f0;">
    <!-- 极柔背景装饰 -->
    <div class="fixed -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
      style="background: radial-gradient(circle at 30% 30%, rgba(215, 195, 180, 0.08) 0%, transparent 60%);"></div>
    <div class="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
      style="background: radial-gradient(circle at 70% 60%, rgba(200, 180, 165, 0.05) 0%, transparent 60%);"></div>

    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.restoreUser()
})
</script>