<!-- src/views/AboutView.vue -->
<template>
  <div class="pt-20 pb-8">
    <div class="max-w-4xl mx-auto px-6">
      <!-- ====== 页面头部 ====== -->
      <section class="mb-12">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🌿</span>
          <h1 class="text-3xl font-light tracking-wide" style="color: var(--c-text-1)">
            关于栖所
          </h1>
        </div>
        <p class="text-sm font-light" style="color: var(--c-text-2)">
          一个温暖、安全的心理健康互助平台。
        </p>
        <div class="w-12 h-px mt-3" style="background: var(--c-accent)"></div>
      </section>

      <!-- ====== 内容 ====== -->
      <div class="space-y-8">
        <!-- 愿景 -->
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">💛</span>
            <h2 class="text-lg font-light tracking-wide" style="color: var(--c-text-1)">
              我们的愿景
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            让每一个在情绪困境中的人，都能找到一个安全、温暖的角落。
            我们相信，分享与倾听是治愈的开始。
          </p>
        </div>

        <!-- 使命 -->
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">🕊️</span>
            <h2 class="text-lg font-light tracking-wide" style="color: var(--c-text-1)">
              我们的使命
            </h2>
          </div>
          <ul
            class="space-y-2 text-sm font-light leading-relaxed"
            style="color: var(--c-text-about)"
          >
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">✦</span>
              <span
                >提供一个<strong style="color: var(--c-text-1); font-weight: 400"
                  >匿名且安全</strong
                >的分享空间</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">✦</span>
              <span
                >帮助用户<strong style="color: var(--c-text-1); font-weight: 400"
                  >看见和接纳</strong
                >自己的情绪</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">✦</span>
              <span
                >汇聚<strong style="color: var(--c-text-1); font-weight: 400"
                  >温暖的互助力量</strong
                >，让每个人都不再孤单</span
              >
            </li>
          </ul>
        </div>

        <!-- 团队 -->
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">🌟</span>
            <h2 class="text-lg font-light tracking-wide" style="color: var(--c-text-1)">
              关于我们
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            栖所由一群关注心理健康、热爱技术的年轻人创建。
            我们相信，技术可以成为连接心灵的桥梁，让温暖触达每一个需要的人。
          </p>
          <div
            class="mt-4 pt-3"
            style="border-top: 1px solid var(--c-divider)"
          >
            <p class="text-xs font-light" style="color: var(--c-text-3)">
              ✦ 云术工作室 · ClouderyStudio
            </p>
            <p class="text-xs font-light mt-1" style="color: var(--c-text-4)">
              <a
                href="https://github.com/ClouderyStudio"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors"
                style="color: var(--c-text-3); border-bottom: 1px dotted var(--c-accent)"
                @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
                @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-3)')"
              >
                GitHub →
              </a>
            </p>
          </div>
        </div>

        <!-- 技术栈 -->
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">⚙️</span>
            <h2 class="text-lg font-light tracking-wide" style="color: var(--c-text-1)">
              技术栈
            </h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              class="px-3 py-1 text-xs rounded-full"
              style="
                background: var(--c-tag-bg);
                color: var(--c-text-2);
                border: 1px solid var(--c-border-2);
              "
              >Vue 3</span
            >
            <span
              class="px-3 py-1 text-xs rounded-full"
              style="
                background: var(--c-tag-bg);
                color: var(--c-text-2);
                border: 1px solid var(--c-border-2);
              "
              >TypeScript</span
            >
            <span
              class="px-3 py-1 text-xs rounded-full"
              style="
                background: var(--c-tag-bg);
                color: var(--c-text-2);
                border: 1px solid var(--c-border-2);
              "
              >Tailwind CSS</span
            >
            <span
              class="px-3 py-1 text-xs rounded-full"
              style="
                background: var(--c-tag-bg);
                color: var(--c-text-2);
                border: 1px solid var(--c-border-2);
              "
              >ASP.NET Core</span
            >
            <span
              class="px-3 py-1 text-xs rounded-full"
              style="
                background: var(--c-tag-bg);
                color: var(--c-text-2);
                border: 1px solid var(--c-border-2);
              "
              >Casdoor</span
            >
            <span
              class="px-3 py-1 text-xs rounded-full"
              style="
                background: var(--c-tag-bg);
                color: var(--c-text-2);
                border: 1px solid var(--c-border-2);
              "
              >MySQL</span
            >
          </div>
        </div>

        <!-- 联系 -->
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-accent-soft);
            border-left: 6px solid var(--c-accent);
          "
        >
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">💌</span>
            <h2 class="text-lg font-light tracking-wide" style="color: var(--c-text-1)">
              联系我们
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            如果你有任何建议、想法，或者需要帮助，欢迎通过以下方式联系我们：
          </p>
          <div class="mt-3 space-y-1 text-sm font-light" style="color: var(--c-text-2)">
            <p>
              📧
              <a
                href="mailto:admin@cldery.com"
                class="transition-colors"
                style="color: var(--c-text-3); border-bottom: 1px dotted var(--c-accent)"
                @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
                @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-3)')"
                >admin@cldery.com</a
              >
            </p>
            <p>
              🐙
              <a
                href="https://github.com/ClouderyStudio"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors"
                style="color: var(--c-text-3); border-bottom: 1px dotted var(--c-accent)"
                @mouseenter="(e: any) => (e.currentTarget.style.color = 'var(--c-text-1)')"
                @mouseleave="(e: any) => (e.currentTarget.style.color = 'var(--c-text-3)')"
                >ClouderyStudio</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
