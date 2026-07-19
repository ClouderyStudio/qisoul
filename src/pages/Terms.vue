<!-- src/views/TermsView.vue -->
<template>
  <div class="pt-20 pb-8">
    <div class="max-w-4xl mx-auto px-6">
      <!-- ====== 页面头部 ====== -->
      <section class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">📋</span>
          <h1 class="text-3xl font-light tracking-wide" style="color: var(--c-text-1)">
            服务条款
          </h1>
        </div>
        <p class="text-sm font-light" style="color: var(--c-text-2)">
          使用栖所即表示你同意以下条款。
        </p>
        <div class="w-12 h-px mt-3" style="background: var(--c-accent)"></div>
      </section>

      <!-- ====== 内容 ====== -->
      <div class="space-y-6">
        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            更新日期：<span class="text-xs" style="color: var(--c-text-3)"
              >2026年7月</span
            >
          </p>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">✅</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: var(--c-text-1)"
            >
              1. 接受条款
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            通过注册和使用栖所（以下简称"本平台"），你表示已阅读、理解并同意遵守本服务条款。
            如果你不同意这些条款，请勿使用本平台。
          </p>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">🤝</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: var(--c-text-1)"
            >
              2. 用户责任
            </h2>
          </div>
          <ul
            class="space-y-2 text-sm font-light leading-relaxed"
            style="color: var(--c-text-about)"
          >
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                ><strong style="color: var(--c-text-1); font-weight: 400"
                  >真实信息</strong
                >：请使用真实信息注册，以便获得更好的服务体验</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                ><strong style="color: var(--c-text-1); font-weight: 400"
                  >友善交流</strong
                >：尊重他人，不发布攻击性、歧视性或不当内容</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                ><strong style="color: var(--c-text-1); font-weight: 400"
                  >隐私保护</strong
                >：不泄露他人隐私，不传播他人个人信息</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                ><strong style="color: var(--c-text-1); font-weight: 400"
                  >账号安全</strong
                >：妥善保管账号，不与他人共享</span
              >
            </li>
          </ul>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">⚠️</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: var(--c-text-1)"
            >
              3. 禁止行为
            </h2>
          </div>
          <ul
            class="space-y-2 text-sm font-light leading-relaxed"
            style="color: var(--c-text-about)"
          >
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >发布
                <strong style="color: var(--c-text-1); font-weight: 400"
                  >违法、色情、暴力</strong
                >
                等内容</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >进行
                <strong style="color: var(--c-text-1); font-weight: 400"
                  >骚扰、霸凌或人身攻击</strong
                ></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >传播
                <strong style="color: var(--c-text-1); font-weight: 400"
                  >虚假信息或谣言</strong
                ></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >利用本平台进行
                <strong style="color: var(--c-text-1); font-weight: 400"
                  >商业推广或诈骗</strong
                ></span
              >
            </li>
          </ul>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">📄</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: var(--c-text-1)"
            >
              4. 内容版权
            </h2>
          </div>
          <ul
            class="space-y-2 text-sm font-light leading-relaxed"
            style="color: var(--c-text-about)"
          >
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >你在本平台发布的<strong
                  style="color: var(--c-text-1); font-weight: 400"
                  >内容归你所有</strong
                ></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >你授予栖所在平台内
                <strong style="color: var(--c-text-1); font-weight: 400"
                  >展示和传播</strong
                >
                你内容的权利</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span style="color: var(--c-text-4)">•</span>
              <span
                >你可以在任何时候
                <strong style="color: var(--c-text-1); font-weight: 400">删除</strong>
                自己发布的内容</span
              >
            </li>
          </ul>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">🔄</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: var(--c-text-1)"
            >
              5. 条款变更
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            栖保留随时修改本服务条款的权利。如有重大变更，我们会通过平台公告或邮件通知用户。
            继续使用本平台即视为接受修改后的条款。
          </p>
        </div>

        <div
          class="p-6 rounded-[2rem]"
          style="
            background: var(--c-accent-soft);
            border-left: 6px solid var(--c-accent);
          "
        >
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">📧</span>
            <h2
              class="text-base font-light tracking-wide"
              style="color: var(--c-text-1)"
            >
              联系我们
            </h2>
          </div>
          <p class="text-sm font-light leading-relaxed" style="color: var(--c-text-about)">
            如有问题，请联系
            <a
              href="mailto:admin@cldery.com"
              class="transition-colors"
              style="color: var(--c-text-3); border-bottom: 1px dotted var(--c-accent)"
              @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
              @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
              >admin@cldery.com</a
            >。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
