<!-- src/views/HelpView.vue -->
<template>
  <div class="pt-20 pb-8">
    <div class="max-w-4xl mx-auto px-6">
      <!-- ====== 页面头部 ====== -->
      <section class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">❓</span>
          <h1 class="text-3xl font-light tracking-wide" style="color: var(--c-text-1)">
            帮助中心
          </h1>
        </div>
        <p class="text-sm font-light" style="color: var(--c-text-2)">
          常见问题解答，帮助你更好地使用栖所。
        </p>
        <div class="w-12 h-px mt-3" style="background: var(--c-accent)"></div>
      </section>

      <!-- ====== 搜索框 ====== -->
      <div class="mb-8">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            class="w-full p-3 pl-10 text-sm transition-all rounded-[1.5rem]"
            style="
              background: var(--c-card-bg);
              border: 1px solid var(--c-border-2);
              color: var(--c-text-content);
              font-weight: 300;
            "
            placeholder="搜索帮助内容..."
            @focus="(e) => (e.currentTarget.style.borderColor = 'var(--c-accent)')"
            @blur="(e) => (e.currentTarget.style.borderColor = 'var(--c-border-2)')"
          />
          <span
            class="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
            style="color: var(--c-text-4)"
            >🔍</span
          >
        </div>
      </div>

      <!-- ====== 帮助分类 ====== -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeCategory = cat.value"
          class="px-4 py-1.5 text-xs font-light transition-all rounded-full"
          :style="
            activeCategory === cat.value
              ? 'background: var(--c-accent-light); color: var(--c-text-1); border: 1px solid var(--c-accent);'
              : 'background: transparent; color: var(--c-text-3); border: 1px solid transparent;'
          "
          @mouseenter="
            (e) => {
              if (activeCategory !== cat.value) {
                e.currentTarget.style.borderColor = 'var(--c-accent)';
                e.currentTarget.style.background = 'var(--c-accent-soft)';
              }
            }
          "
          @mouseleave="
            (e) => {
              if (activeCategory !== cat.value) {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }
            }
          "
        >
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>

      <!-- ====== 帮助列表 ====== -->
      <div class="space-y-3">
        <div
          v-for="item in filteredHelpItems"
          :key="item.id"
          class="p-5 transition-all rounded-[2rem] cursor-pointer"
          style="
            background: var(--c-card-bg);
            border: 1px solid var(--c-border-1);
          "
          @mouseenter="
            (e) => {
              e.currentTarget.style.borderColor = 'var(--c-border-3)';
              e.currentTarget.style.boxShadow =
                '0 8px 20px rgba(150, 130, 110, 0.06)';
            }
          "
          @mouseleave="
            (e) => {
              e.currentTarget.style.borderColor = 'var(--c-border-1)';
              e.currentTarget.style.boxShadow = 'none';
            }
          "
          @click="toggleItem(item.id)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3">
                <span class="text-lg">{{ item.icon }}</span>
                <h3 class="text-base font-light" style="color: var(--c-text-1)">
                  {{ item.question }}
                </h3>
              </div>
              <div
                v-show="expandedId === item.id"
                class="mt-3 pt-3"
                style="border-top: 1px solid var(--c-divider)"
              >
                <p
                  class="text-sm font-light leading-relaxed"
                  style="color: var(--c-text-about); white-space: pre-line"
                >
                  {{ item.answer }}
                </p>
              </div>
            </div>
            <span
              class="text-sm transition-transform"
              style="color: var(--c-text-4)"
              :style="{
                transform:
                  expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
              }"
            >
              ▼
            </span>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-if="filteredHelpItems.length === 0"
        class="text-center py-12"
        style="
          background: var(--c-card-alt);
          border-radius: 3rem;
          border: 1px dashed var(--c-border-2);
        "
      >
        <div class="text-4xl mb-3">🔍</div>
        <p class="text-sm font-light" style="color: var(--c-text-3)">
          没有找到相关帮助内容
        </p>
        <p class="text-xs font-light mt-1" style="color: var(--c-text-4)">
          试试其他关键词
        </p>
      </div>

      <!-- ====== 联系支持 ====== -->
      <div
        class="mt-8 p-6 rounded-[2rem] text-center"
        style="background: var(--c-accent-soft); border: 1px solid var(--c-border-1)"
      >
        <span class="text-2xl block mb-2">💌</span>
        <p class="text-sm font-light" style="color: var(--c-text-about)">仍然有问题？</p>
        <p class="text-xs font-light mt-1" style="color: var(--c-text-3)">
          联系我们，我们会尽快回复你
        </p>
        <a
          href="mailto:admin@cldery.com"
          class="inline-block mt-3 px-6 py-2 text-sm font-light transition-all rounded-full"
          style="background: var(--c-btn-bg); color: var(--c-text-btn); border: 1px solid var(--c-btn-border)"
          @mouseenter="
            (e) => {
              e.currentTarget.style.background = 'var(--c-btn-hover)';
              e.currentTarget.style.borderColor = 'var(--c-accent-border)';
            }
          "
          @mouseleave="
            (e) => {
              e.currentTarget.style.background = 'var(--c-btn-bg)';
              e.currentTarget.style.borderColor = 'var(--c-btn-border)';
            }
          "
        >
          发送邮件
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// ====== 分类 ======
const categories = ref([
  { value: "all", label: "全部", icon: "✦" },
  { value: "account", label: "账号", icon: "👤" },
  { value: "mood", label: "心情记录", icon: "📝" },
  { value: "community", label: "社区", icon: "💬" },
  { value: "privacy", label: "隐私安全", icon: "🔒" },
]);

const activeCategory = ref("all");
const searchQuery = ref("");
const expandedId = ref<string | null>(null);

// ====== 帮助数据 ======
const helpItems = ref([
  {
    id: "1",
    icon: "👤",
    question: "如何注册账号？",
    answer:
      "点击页面右上角的「开始体验」或「登录」按钮，使用统一账号（Casdoor）授权登录即可。首次登录会自动创建账号。",
    category: "account",
  },
  {
    id: "2",
    icon: "👤",
    question: "如何修改个人信息？",
    answer:
      "目前个人信息（如用户名、头像）由统一账号系统同步管理。你可以在登录页通过统一账号系统修改这些信息，修改后会自动同步到栖所。",
    category: "account",
  },
  {
    id: "3",
    icon: "👤",
    question: "如何注销账号？",
    answer:
      "如需注销账号，请发送邮件至 admin@cldery.com 联系我们。我们会核实身份后协助你完成注销，并删除所有相关数据。",
    category: "account",
  },
  {
    id: "4",
    icon: "📝",
    question: "如何记录心情？",
    answer:
      "登录后进入「仪表盘」，点击「记录心情」按钮。选择对应的情绪图标（如😊开心、😌平静等），可以调整强度，添加文字备注和标签。",
    category: "mood",
  },
  {
    id: "5",
    icon: "📝",
    question: "心情记录可以删除吗？",
    answer:
      "可以。在「仪表盘」的近期心情列表中，找到对应的记录，点击删除按钮即可移除。该操作不可撤销，请谨慎操作。",
    category: "mood",
  },
  {
    id: "6",
    icon: "📝",
    question: "什么是情绪标签？",
    answer:
      "情绪标签可以帮助你更细致地记录情绪触发因素。你可以选择预设标签（如「工作」「学习」「家庭」等），也可以自定义标签，让记录更加个性化。",
    category: "mood",
  },
  {
    id: "7",
    icon: "💬",
    question: "如何分享帖子？",
    answer:
      "进入「社区」页面，点击「分享你的方法」按钮。可以选择「便签」或「帖子」两种形式，填写内容后发布即可。",
    category: "community",
  },
  {
    id: "8",
    icon: "💬",
    question: "什么是便签？什么是帖子？",
    answer:
      "便签是简短的小方法或暖心提醒（类似便利贴），适合快速分享一个小技巧。帖子是更详细的经验分享，可以包含更完整的故事和方法。",
    category: "community",
  },
  {
    id: "9",
    icon: "💬",
    question: "如何删除自己的内容？",
    answer:
      "在「社区」页面，找到你发布的帖子或便签。每个内容卡片下方都有「删除」按钮（仅对你自己的内容可见），点击即可删除。",
    category: "community",
  },
  {
    id: "10",
    icon: "🔒",
    question: "我的数据安全吗？",
    answer:
      "栖所非常重视你的数据安全。所有数据通过 HTTPS 加密传输，密码经过哈希加密存储。我们不会出售或分享你的个人数据给第三方。",
    category: "privacy",
  },
  {
    id: "11",
    icon: "🔒",
    question: "谁可以看见我的心情记录？",
    answer:
      "你的心情记录是私有的，仅你自己可见。只有你在社区主动分享的帖子或便签是公开可见的。",
    category: "privacy",
  },
  {
    id: "12",
    icon: "🔒",
    question: "平台如何保护用户隐私？",
    answer:
      "我们遵循最小必要原则收集信息，仅收集提供核心功能所需的基本数据。所有数据加密存储，并严格按照隐私政策处理。详细内容请查看「隐私政策」页面。",
    category: "privacy",
  },
]);

// ====== 筛选 ======
const filteredHelpItems = computed(() => {
  let items = helpItems.value;

  // 分类筛选
  if (activeCategory.value !== "all") {
    items = items.filter((item) => item.category === activeCategory.value);
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    items = items.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query),
    );
  }

  return items;
});

// ====== 展开/收起 ======
const toggleItem = (id: string) => {
  if (expandedId.value === id) {
    expandedId.value = null;
  } else {
    expandedId.value = id;
  }
};
</script>
