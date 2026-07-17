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
      class="w-full max-w-md text-center"
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
      <!-- ====== 加载状态 ====== -->
      <div v-if="status === 'loading'" class="space-y-5">
        <div class="flex justify-center">
          <div
            class="w-14 h-14 rounded-full"
            style="
              border: 3px solid #e7dbd0;
              border-top-color: #b8aa98;
              animation: spin 0.8s linear infinite;
            "
          ></div>
        </div>
        <div>
          <h2 class="text-xl font-light tracking-wide" style="color: #4f4842">
            正在登录
          </h2>
          <p class="text-sm font-light mt-1" style="color: #8a7e74">
            请稍候，即将带你回到栖所
          </p>
        </div>
      </div>

      <!-- ====== 成功状态 ====== -->
      <div v-else-if="status === 'success'" class="space-y-5">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style="
            background: rgba(236, 227, 219, 0.4);
            border: 1px solid #dccfc4;
          "
        >
          <svg
            class="w-8 h-8"
            style="color: #8a7e74"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-light tracking-wide" style="color: #4f4842">
            欢迎回来
          </h2>
          <p class="text-base font-light mt-1" style="color: #6d6259">
            {{ user?.username }}
          </p>
          <p class="text-sm font-light mt-0.5" style="color: #8a7e74">
            即将跳转...
          </p>
        </div>
      </div>

      <!-- ====== 错误状态 ====== -->
      <div v-else-if="status === 'error'" class="space-y-5">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style="
            background: rgba(236, 227, 219, 0.3);
            border: 1px solid #e7dbd0;
          "
        >
          <svg
            class="w-8 h-8"
            style="color: #b8aa98"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-light tracking-wide" style="color: #4f4842">
            登录遇到一点小问题
          </h2>
          <p class="text-sm font-light mt-1" style="color: #8a7e74">
            {{ errorMessage }}
          </p>
        </div>
        <div class="flex flex-col gap-3 pt-2">
          <button
            @click="retryLogin"
            class="px-8 py-2.5 text-sm font-light transition-all rounded-full"
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
            重新尝试
          </button>
          <button
            @click="goHome"
            class="px-8 py-2.5 text-sm font-light transition-all rounded-full"
            style="
              background: transparent;
              color: #8a7e74;
              border: 1px solid #e7dbd0;
            "
            @mouseenter="
              (e) => {
                e.currentTarget.style.borderColor = '#dccfc4';
                e.currentTarget.style.color = '#4f4842';
              }
            "
            @mouseleave="
              (e) => {
                e.currentTarget.style.borderColor = '#e7dbd0';
                e.currentTarget.style.color = '#8a7e74';
              }
            "
          >
            回到首页
          </button>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="fixed bottom-6 left-0 right-0 text-center pointer-events-none">
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
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// ====== 状态 ======
const status = ref<"loading" | "success" | "error">("loading");
const errorMessage = ref("");
const user = ref<any>(null);

// ====== 处理回调 ======
const handleCallback = async () => {
  // 1. 从 URL 提取 code
  const code = route.query.code as string;

  // 2. 检查 Casdoor 返回的错误
  const error = route.query.error as string;
  const errorDescription = route.query.error_description as string;

  if (error) {
    status.value = "error";
    errorMessage.value = errorDescription || `授权失败: ${error}`;
    return;
  }

  if (!code) {
    status.value = "error";
    errorMessage.value = "未收到授权码，请重新登录";
    return;
  }

  try {
    // 3. 调用后端 API 完成登录
    const redirectUri = `${window.location.origin}/callback`;
    const result = await userStore.login(code, redirectUri);

    if (result.success) {
      user.value = result.user;
      status.value = "success";

      // 4. 延迟跳转
      setTimeout(() => {
        const redirect = (route.query.redirect as string) || "/dashboard";
        router.replace(redirect);
      }, 1500);
    }
  } catch (err: any) {
    status.value = "error";
    errorMessage.value = err.message || "登录失败，请重试";
  }
};

// ====== 操作 ======
const goHome = () => {
  router.push("/");
};

const retryLogin = () => {
  router.push("/login");
};

// ====== 生命周期 ======
onMounted(() => {
  handleCallback();
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 卡片入场动画 */
.card-enter {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
