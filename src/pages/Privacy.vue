<!-- src/views/PrivacyView.vue -->
<template>
  <div class="pt-20 pb-8">
    <div class="max-w-4xl mx-auto px-6">
      <!-- ====== 页面头部 ====== -->
      <section class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🔒</span>
          <h1 class="text-3xl font-light tracking-wide" style="color: #4f4842">
            隐私政策
          </h1>
        </div>
        <p class="text-sm font-light" style="color: #6d6259">
          我们如何保护你的隐私和数据安全。
        </p>
        <div class="w-12 h-px mt-3" style="background: #dccfc4"></div>
      </section>

      <!-- ====== 内容 ====== -->
      <div class="space-y-6">
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: rgba(255, 250, 245, 0.6);
            border: 1px solid #efe7e0;
          "
        >
          <p class="text-sm font-light leading-relaxed" style="color: #5f5547">
            更新日期：<span class="text-xs" style="color: #8a7e74"
              >2026年7月</span
            >
          </p>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: rgba(255, 250, 245, 0.6);
            border: 1px solid #efe7e0;
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">📌</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: #4f4842"
            >
              1. 信息收集
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: #5f5547">
            栖所仅收集你主动提供的信息，包括：
          </p>
          <ul
            class="mt-2 space-y-1 text-sm font-light leading-relaxed"
            style="color: #5f5547"
          >
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >通过统一账号登录获取的<strong
                  style="color: #4f4842; font-weight: 400"
                  >基本用户信息</strong
                >（用户名、邮箱、头像）</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >你在平台上主动记录的<strong
                  style="color: #4f4842; font-weight: 400"
                  >心情记录</strong
                >和<strong style="color: #4f4842; font-weight: 400"
                  >分享内容</strong
                ></span
              >
            </li>
          </ul>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: rgba(255, 250, 245, 0.6);
            border: 1px solid #efe7e0;
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">🛡️</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: #4f4842"
            >
              2. 信息保护
            </h2>
          </div>
          <ul
            class="space-y-2 text-sm font-light leading-relaxed"
            style="color: #5f5547"
          >
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >所有数据通过
                <strong style="color: #4f4842; font-weight: 400"
                  >加密传输</strong
                >（HTTPS）保护</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >用户密码等敏感信息经过
                <strong style="color: #4f4842; font-weight: 400"
                  >哈希加密</strong
                >存储</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >我们<strong style="color: #4f4842; font-weight: 400"
                  >不会出售或分享</strong
                >你的个人数据给第三方</span
              >
            </li>
          </ul>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: rgba(255, 250, 245, 0.6);
            border: 1px solid #efe7e0;
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">🔑</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: #4f4842"
            >
              3. 你的权利
            </h2>
          </div>
          <ul
            class="space-y-2 text-sm font-light leading-relaxed"
            style="color: #5f5547"
          >
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >你可以随时
                <strong style="color: #4f4842; font-weight: 400"
                  >查看和删除</strong
                >
                自己的发布内容</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >你可以随时
                <strong style="color: #4f4842; font-weight: 400"
                  >注销账号</strong
                >，我们会删除你的所有数据</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: #b8aa98">•</span>
              <span
                >你的心情数据<strong style="color: #4f4842; font-weight: 400"
                  >仅你可见</strong
                >，不会公开</span
              >
            </li>
          </ul>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: rgba(255, 250, 245, 0.6);
            border: 1px solid #efe7e0;
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">🍪</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: #4f4842"
            >
              4. Cookie 使用
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: #5f5547">
            栖所使用必要的 Cookie 来保持你的登录状态。这些 Cookie
            不包含任何敏感信息，
            仅用于提供正常的服务功能。你可以在浏览器设置中管理或清除这些
            Cookie。
          </p>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: rgba(245, 238, 232, 0.3);
            border-left: 6px solid #dccfc4;
          "
        >
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">📧</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: #4f4842"
            >
              联系我们
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: #5f5547">
            如有隐私相关问题，请通过
            <a
              href="mailto:admin@cldery.com"
              class="transition-colors"
              style="color: #8a7e74; border-bottom: 1px dotted #dccfc4"
              @mouseenter="(e) => (e.currentTarget.style.color = '#4f4842')"
              @mouseleave="(e) => (e.currentTarget.style.color = '#8a7e74')"
              >admin@cldery.com</a
            >
            联系我们。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
