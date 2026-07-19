<template>
  <div class="min-h-screen" style="background: var(--c-bg)">
    <div
      class="fixed -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-60"
      style="
        background: radial-gradient(
          circle at 30% 30%,
          var(--c-accent) 0%,
          transparent 60%
        );
      "
    ></div>
    <div
      class="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none opacity-40"
      style="
        background: radial-gradient(
          circle at 70% 60%,
          var(--c-accent) 0%,
          transparent 60%
        );
      "
    ></div>

    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.restoreUser();
});
</script>
