<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 py-8"
    style="background: #f6f3f0"
  >
    <!-- 极柔背景装饰 -->
    <div
      class="fixed -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
      style="
        background: radial-gradient(
          circle at 30% 30%,
          rgba(215, 195, 180, 0.08) 0%,
          transparent 60%
        );
      "
    ></div>
    <div
      class="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
      style="
        background: radial-gradient(
          circle at 70% 60%,
          rgba(200, 180, 165, 0.05) 0%,
          transparent 60%
        );
      "
    ></div>

    <div
      class="w-full max-w-sm"
      style="
        background: rgba(255, 250, 245, 0.75);
        backdrop-filter: blur(2px);
        border-radius: 3rem;
        padding: 2.8rem 2.5rem;
        box-shadow:
          0 12px 30px rgba(140, 120, 100, 0.08),
          0 4px 10px rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(230, 215, 200, 0.3);
      "
    >
      <!-- Logo -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style="background: rgba(236, 227, 219, 0.6)"
        >
          <svg
            class="w-8 h-8"
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
        <h1
          class="text-3xl font-light tracking-wide"
          style="color: #4f4842; letter-spacing: -0.5px"
        >
          栖所
        </h1>
        <p class="text-sm font-light mt-1" style="color: #8a7e74">
          安静 · 温和 · 长久
        </p>
      </div>

      <p class="text-sm text-center mb-6 font-light" style="color: #6d6259">
        登录以继续
      </p>

      <button
        @click="loginWithCasdoor"
        :disabled="loading"
        class="w-full py-3.5 text-sm font-light transition-all rounded-full flex items-center justify-center gap-3 disabled:opacity-50"
        style="background: #ece3db; color: #4d443d; border: 1px solid #e2d5ca"
        @mouseenter="
          (e) => {
            if (!loading) {
              e.currentTarget.style.background = '#e0d3c8';
              e.currentTarget.style.borderColor = '#cebdb0';
            }
          }
        "
        @mouseleave="
          (e) => {
            if (!loading) {
              e.currentTarget.style.background = '#ece3db';
              e.currentTarget.style.borderColor = '#e2d5ca';
            }
          }
        "
      >
        <span
          v-if="loading"
          class="w-4 h-4 border-2 border-[#4d443d]/30 border-t-[#4d443d] rounded-full animate-spin"
        ></span>
        <template v-else>
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            />
          </svg>
          <span>使用统一账号登录/注册</span>
        </template>
      </button>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full" style="border-top: 1px dashed #e7dbd0"></div>
        </div>
        <div class="relative flex justify-center">
          <span
            class="px-3 text-xs font-light"
            style="background: rgba(255, 250, 245, 0.75); color: #8a7e74"
            >安全 · 温和</span
          >
        </div>
      </div>

      <div
        class="flex items-center justify-center gap-5 text-xs font-light"
        style="color: #8a7e74"
      >
        <span class="flex items-center gap-1.5"
          ><span
            class="w-1.5 h-1.5 rounded-full"
            style="background: #dccfc4"
          ></span
          >加密传输</span
        >
        <span class="w-px h-4" style="background: #e7dbd0"></span>
        <span class="flex items-center gap-1.5"
          ><span
            class="w-1.5 h-1.5 rounded-full"
            style="background: #dccfc4"
          ></span
          >隐私保护</span
        >
        <span class="w-px h-4" style="background: #e7dbd0"></span>
        <span class="flex items-center gap-1.5"
          ><span
            class="w-1.5 h-1.5 rounded-full"
            style="background: #dccfc4"
          ></span
          >用心守护</span
        >
      </div>

      <p class="text-center text-xs font-light mt-6" style="color: #8a7e74">
        登录即表示你同意
        <a
          href="/terms"
          class="transition-colors"
          style="color: #6d6259; border-bottom: 1px dotted #dccfc4"
          @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
          @mouseleave="(e) => (e.currentTarget.style.color = '#6d6259')"
          >服务条款</a
        >
        <span class="mx-1">·</span>
        <a
          href="/privacy"
          class="transition-colors"
          style="color: #6d6259; border-bottom: 1px dotted #dccfc4"
          @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
          @mouseleave="(e) => (e.currentTarget.style.color = '#6d6259')"
          >隐私政策</a
        >
      </p>
    </div>

    <div class="fixed top-20 left-0 right-0 text-center pointer-events-none">
      <p
        class="text-xs tracking-widest font-light"
        style="color: #b8aa98; letter-spacing: 0.15em"
      >
        ✦ 在这里，你不必独自承受 ✦
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const loading = ref(false);
const checkingAuth = ref(true);
const userStore = useUserStore();

const CASDOOR_CONFIG = {
  serverUrl: "https://auth.cldery.com",
  clientId: "75c6718aad099242d03f",
  appName: "iam",
  organizationName: "iam",
};

const generateState = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
};

const loginWithCasdoor = () => {
  loading.value = true;
  const redirectUri = `${window.location.origin}/callback`;
  const state = generateState();
  sessionStorage.setItem("oauth_state", state);

  const params = new URLSearchParams({
    client_id: CASDOOR_CONFIG.clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "openid profile email",
    state,
  });

  window.location.href = `${CASDOOR_CONFIG.serverUrl}/login/oauth/authorize?${params.toString()}`;
};

// ====== 检查登录状态 ======
const checkAuth = async () => {
  checkingAuth.value = true;
  try {
    // 先尝试从 localStorage 恢复
    const hasLocal = userStore.restoreUser();
    if (hasLocal) {
      // 如果有本地缓存，再验证后端状态
      const isValid = await userStore.checkStatus();
      if (isValid) {
        // 已登录，跳转到仪表盘
        router.replace("/dashboard");
        return;
      }
    }
    // 未登录，显示登录页面
    checkingAuth.value = false;
  } catch (error) {
    console.error("检查登录状态失败:", error);
    checkingAuth.value = false;
  }
};

// ====== 生命周期 ======
onMounted(() => {
  checkAuth();
});
</script>
