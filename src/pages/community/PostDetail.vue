<template>
  <div class="pt-20 pb-8">
    <div class="max-w-3xl mx-auto px-6">
      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-16">
        <div
          class="w-10 h-10 border-2 border-t-warm-500 border-warm-200 rounded-full animate-spin mx-auto"
        ></div>
        <p class="text-sm font-light mt-4" style="color: var(--c-text-3)">加载中...</p>
      </div>

      <!-- 帖子详情 -->
      <div
        v-else-if="post"
        class="p-8 rounded-[2.5rem]"
        style="background: var(--c-card-bg); border: 1px solid var(--c-border-1)"
      >
        <!-- 返回按钮 -->
        <button
          @click="goBack"
          class="text-sm font-light transition-colors flex items-center gap-2 mb-6"
          style="color: var(--c-text-3)"
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
        >
          ← 返回
        </button>

        <!-- 帖子内容 -->
        <div class="flex items-center gap-3 mb-4">
          <span class="text-2xl">{{ post.icon || "📖" }}</span>
          <h1 class="text-2xl font-light tracking-wide" style="color: var(--c-text-1)">
            {{ post.title }}
          </h1>
          <span
            class="px-2 py-0.5 text-[10px] rounded-full"
            style="
              background: var(--c-tag-bg);
              color: var(--c-text-2);
              border: 1px solid var(--c-border-2);
              flex-shrink: 0;
            "
            >{{ post.category }}</span
          >
        </div>

        <div
          class="flex items-center gap-2 mb-6 text-xs font-light"
          style="color: var(--c-text-3)"
        >
          <img
            :src="post.userAvatar || '/default-avatar.png'"
            alt="头像"
            class="w-5 h-5 rounded-full object-cover"
            style="border: 1px solid var(--c-divider)"
            @error="
              (e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.png';
              }
            "
          />
          <span> {{ post.username || "匿名用户" }}</span>
          <span>{{ formatTime(post.createdAt) }}</span>
        </div>

        <!-- Markdown 渲染区域 -->
        <div
          class="markdown-body markdown-preview prose prose-sm max-w-none"
          style="
            color: var(--c-text-content);
            font-size: 14px;
            line-height: 1.8;
            font-weight: 300;
          "
          v-html="renderedHtml"
        ></div>

        <!-- 底部操作栏 -->
        <div
          class="flex items-center gap-6 mt-6 pt-4"
          style="border-top: 1px solid var(--c-divider)"
        >
          <button
            @click="likePost"
            :disabled="liked"
            class="text-sm font-light transition-colors flex items-center gap-2"
            :style="{ color: liked ? '#e8a0a0' : 'var(--c-text-3)', cursor: liked ? 'default' : 'pointer' }"
            @mouseenter="(e) => { if (!liked) e.currentTarget.style.color = 'var(--c-text-1)' }"
            @mouseleave="(e) => { if (!liked) e.currentTarget.style.color = 'var(--c-text-3)' }"
          >
            {{ liked ? '❤️' : '💛' }} {{ post.likes }}
          </button>
          <span class="text-sm font-light" style="color: var(--c-text-3)"
            >💬 {{ post.comments || 0 }}</span
          >

          <!-- 编辑和删除按钮（仅自己的帖子） -->
          <div v-if="isMyPost" class="flex items-center gap-3 ml-auto">
            <button
              @click="openEditModal"
              class="text-sm font-light transition-colors flex items-center gap-1"
              style="color: var(--c-text-3)"
              @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
              @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-3)')"
            >
              ✏️ 编辑
            </button>
            <button
              @click="confirmDelete"
              class="text-sm font-light transition-colors flex items-center gap-1"
              style="color: var(--c-text-4)"
              @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-danger)')"
              @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-4)')"
            >
              🗑️ 删除
            </button>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div
        v-else
        class="text-center py-16"
        style="
          background: var(--c-card-alt);
          border-radius: 3rem;
          border: 1px dashed var(--c-border-2);
        "
      >
        <div class="text-5xl mb-4">📭</div>
        <p class="text-sm font-light" style="color: var(--c-text-3)">
          帖子不存在或已被删除
        </p>
        <button
          @click="goBack"
          class="mt-4 px-6 py-2 text-sm font-light transition-all rounded-full"
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
          返回社区
        </button>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
      style="background: var(--c-overlay-heavy); backdrop-filter: blur(4px)"
    >
      <div
        class="w-full max-w-sm p-6 rounded-[2.5rem] text-center"
        style="
          background: var(--c-card-solid);
          backdrop-filter: blur(8px);
          border: 1px solid var(--c-border-1);
          box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);
        "
      >
        <div class="text-4xl mb-4">🗑️</div>
        <h3 class="text-lg font-light tracking-wide" style="color: var(--c-text-1)">
          确认删除
        </h3>
        <p class="text-sm font-light mt-2" style="color: var(--c-text-2)">
          确定要删除这篇帖子吗？此操作不可撤销。
        </p>
        <div class="flex gap-3 mt-6">
          <button
            @click="deletePost"
            class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
            style="background: var(--c-danger); color: white; border: 1px solid var(--c-danger)"
            @mouseenter="(e) => (e.currentTarget.style.background = 'var(--c-danger-hover)')"
            @mouseleave="(e) => (e.currentTarget.style.background = 'var(--c-danger)')"
          >
            确认删除
          </button>
          <button
            @click="showDeleteModal = false"
            class="flex-1 py-2.5 text-sm font-light transition-all rounded-full"
            style="
              background: transparent;
              color: var(--c-text-3);
              border: 1px solid var(--c-border-2);
            "
            @mouseenter="
              (e) => {
                e.currentTarget.style.borderColor = 'var(--c-accent)';
                e.currentTarget.style.color = 'var(--c-text-1)';
              }
            "
            @mouseleave="
              (e) => {
                e.currentTarget.style.borderColor = 'var(--c-border-2)';
                e.currentTarget.style.color = 'var(--c-text-3)';
              }
            "
          >
            取消
          </button>
        </div>
      </div>
    </div>

    <!-- ====== 编辑帖子弹窗 ====== -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
      style="background: var(--c-overlay); backdrop-filter: blur(4px)"
    >
      <div
        class="w-full max-w-lg p-8 rounded-[3rem]"
        style="
          background: var(--c-card-solid);
          backdrop-filter: blur(8px);
          border: 1px solid var(--c-border-1);
          box-shadow: 0 12px 30px rgba(140, 120, 100, 0.08);
          max-height: 90vh;
          overflow-y: auto;
        "
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-light tracking-wide" style="color: var(--c-text-1)">
            编辑帖子
          </h2>
          <button
            @click="closeEditModal"
            class="text-xl transition-colors"
            style="color: var(--c-text-4)"
            @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
            @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-4)')"
          >
            ✕
          </button>
        </div>

        <!-- 标题 -->
        <div class="space-y-4">
          <div>
            <label
              class="text-xs font-light block mb-1.5"
              style="color: var(--c-text-2)"
              >标题</label
            >
            <input
              v-model="editPostTitle"
              type="text"
              class="w-full p-3 text-sm transition-all rounded-[1.5rem]"
              style="
                background: var(--c-accent-soft);
                border: 1px solid var(--c-border-2);
                color: var(--c-text-content);
                font-weight: 300;
                font-family: &quot;Segoe UI&quot;, sans-serif;
              "
              placeholder="标题..."
              @focus="(e) => (e.currentTarget.style.borderColor = 'var(--c-accent)')"
              @blur="(e) => (e.currentTarget.style.borderColor = 'var(--c-border-2)')"
            />
          </div>

          <!-- 分类 -->
          <div>
            <label
              class="text-xs font-light block mb-1.5"
              style="color: var(--c-text-2)"
              >分类</label
            >
            <select
              v-model="editPostCategory"
              class="w-full p-3 text-sm transition-all rounded-[1.5rem] appearance-none"
              style="
                background: var(--c-accent-soft);
                border: 1px solid var(--c-border-2);
                color: var(--c-text-content);
                font-weight: 300;
                font-family: &quot;Segoe UI&quot;, sans-serif;
                cursor: pointer;
              "
              @focus="(e) => (e.currentTarget.style.borderColor = 'var(--c-accent)')"
              @blur="(e) => (e.currentTarget.style.borderColor = 'var(--c-border-2)')"
            >
              <option value="心理调节">心理调节</option>
              <option value="生活习惯">生活习惯</option>
              <option value="社交支持">社交支持</option>
              <option value="专业帮助">专业帮助</option>
              <option value="日常小技巧">日常小技巧</option>
            </select>
          </div>

          <!-- 内容 -->
          <div>
            <label
              class="text-xs font-light block mb-1.5"
              style="color: var(--c-text-2)"
              >内容</label
            >
            <MarkdownEditor
              v-model="editPostContent"
              placeholder="更新你的分享内容..."
            />
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button
            @click="submitEdit"
            :disabled="editing"
            class="flex-1 py-2.5 text-sm font-light transition-all rounded-full disabled:opacity-50"
            style="
              background: var(--c-btn-bg);
              color: var(--c-text-btn);
              border: 1px solid var(--c-btn-border);
            "
            @mouseenter="
              (e) => {
                if (!editing) {
                  e.currentTarget.style.background = 'var(--c-btn-hover)';
                  e.currentTarget.style.borderColor = 'var(--c-accent-border)';
                }
              }
            "
            @mouseleave="
              (e) => {
                if (!editing) {
                  e.currentTarget.style.background = 'var(--c-btn-bg)';
                  e.currentTarget.style.borderColor = 'var(--c-btn-border)';
                }
              }
            "
          >
            {{ editing ? "保存中..." : "保存修改" }}
          </button>
          <button
            @click="closeEditModal"
            class="px-6 py-2.5 text-sm font-light transition-all rounded-full"
            style="
              background: transparent;
              color: var(--c-text-3);
              border: 1px solid var(--c-border-2);
            "
            @mouseenter="
              (e) => {
                e.currentTarget.style.borderColor = 'var(--c-accent)';
                e.currentTarget.style.color = 'var(--c-text-1)';
              }
            "
            @mouseleave="
              (e) => {
                e.currentTarget.style.borderColor = 'var(--c-border-2)';
                e.currentTarget.style.color = 'var(--c-text-3)';
              }
            "
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { postService, type PostResponse } from "@/services";
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const post = ref<PostResponse | null>(null);
const loading = ref(true);
const showDeleteModal = ref(false);

// ====== 渲染 Markdown ======
const renderedHtml = computed(() => {
  if (!post.value?.content) return '<p style="color: var(--c-text-4);">暂无内容</p>';
  try {
    const rawHtml = marked(post.value.content);
    return DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["target", "rel", "class"],
    });
  } catch (error) {
    console.error("Markdown 渲染失败:", error);
    return '<p style="color: var(--c-text-4);">内容渲染失败</p>';
  }
});
// ====== 编辑帖子 ======
const showEditModal = ref(false);
const editing = ref(false);
const editPostTitle = ref("");
const editPostCategory = ref("");
const editPostContent = ref("");

const openEditModal = () => {
  if (!post.value) return;
  editPostTitle.value = post.value.title;
  editPostCategory.value = post.value.category;
  editPostContent.value = post.value.content;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editPostTitle.value = "";
  editPostCategory.value = "";
  editPostContent.value = "";
};

const submitEdit = async () => {
  if (!post.value) return;
  if (!editPostTitle.value.trim() || !editPostContent.value.trim()) {
    alert("请填写标题和内容");
    return;
  }

  editing.value = true;
  try {
    const updated = await postService.updatePost(post.value.id, {
      title: editPostTitle.value.trim(),
      content: editPostContent.value.trim(),
      category: editPostCategory.value,
    });
    post.value = updated;
    closeEditModal();
  } catch (error) {
    console.error("更新帖子失败:", error);
    alert("更新失败，请重试");
  } finally {
    editing.value = false;
  }
};

// ====== 判断是否为自己的帖子 ======
const isMyPost = computed(() => {
  if (!post.value) return false;
  const currentUser = userStore.user?.username;
  return currentUser ? post.value.username === currentUser : false;
});

// ====== 时间格式化 ======
const formatTime = (dateStr: string) => {
  if (!dateStr) return "刚刚";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) return "刚刚";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  if (diff < 172800000) return "昨天";
  if (diff < 259200000) return "前天";
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

// ====== 加载帖子 ======
const loadPost = async () => {
  const id = route.params.id as string;
  if (!id) {
    loading.value = false;
    return;
  }

  try {
    const result = await postService.getPost(id);
    post.value = result;
    checkLiked();
  } catch (error) {
    console.error("加载帖子失败:", error);
    post.value = null;
  } finally {
    loading.value = false;
  }
};

// ====== 点赞状态 ======
const LIKED_POSTS_KEY = "qisoul_liked_posts";
const liked = ref(false);
const liking = ref(false);

const checkLiked = () => {
  if (!post.value) return;
  try {
    const raw = localStorage.getItem(LIKED_POSTS_KEY);
    if (raw) {
      const set = new Set(JSON.parse(raw));
      liked.value = set.has(post.value.id);
    }
  } catch { /* ignore */ }
};

// ====== 点赞 ======
const likePost = async () => {
  if (!post.value || liked.value || liking.value) return;
  liking.value = true;
  try {
    const result = await postService.likePost(post.value.id);
    post.value.likes = result.likes;
    liked.value = true;
    // 持久化
    try {
      const raw = localStorage.getItem(LIKED_POSTS_KEY);
      const set = raw ? new Set(JSON.parse(raw)) : new Set();
      set.add(post.value.id);
      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...set]));
    } catch { /* ignore */ }
  } catch (error) {
    console.error("点赞失败:", error);
  } finally {
    liking.value = false;
  }
};

// ====== 删除 ======
const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deletePost = async () => {
  if (!post.value) return;
  try {
    await postService.deletePost(post.value.id);
    showDeleteModal.value = false;
    router.push("/community");
  } catch (error) {
    console.error("删除失败:", error);
    alert("删除失败，请重试");
  }
};

const goBack = () => {
  router.push("/community");
};

onMounted(() => {
  userStore.restoreUser();
  loadPost();
});
</script>

<style scoped>
/* ====== Markdown 渲染样式 ====== */
.markdown-body {
  font-family:
    "Segoe UI",
    system-ui,
    -apple-system,
    sans-serif;
}

.markdown-body :deep(h1) {
  font-size: 1.8em;
  font-weight: 300;
  margin: 1.2em 0 0.6em;
  color: var(--c-text-1);
  border-bottom: 2px solid var(--c-divider);
  padding-bottom: 0.3em;
}

.markdown-body :deep(h2) {
  font-size: 1.5em;
  font-weight: 300;
  margin: 1em 0 0.5em;
  color: var(--c-text-1);
  border-bottom: 1px solid var(--c-divider);
  padding-bottom: 0.2em;
}

.markdown-body :deep(h3) {
  font-size: 1.2em;
  font-weight: 300;
  margin: 0.8em 0 0.4em;
  color: var(--c-text-1);
}

.markdown-body :deep(p) {
  margin: 0.6em 0;
  color: var(--c-text-content);
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.5em;
  margin: 0.6em 0;
}

.markdown-body :deep(li) {
  margin: 0.2em 0;
}

.markdown-body :deep(blockquote) {
  border-left: 4px solid var(--c-accent);
  padding: 0.5em 1em;
  margin: 0.8em 0;
  color: var(--c-text-2);
  font-style: italic;
  background: var(--c-accent-soft);
  border-radius: 0 8px 8px 0;
}

.markdown-body :deep(code) {
  background: var(--c-tag-bg);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--c-text-1);
  font-family: "Courier New", monospace;
}

.markdown-body :deep(pre) {
  background: var(--c-tag-bg);
  padding: 1em 1.2em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0.8em 0;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  font-size: 0.9em;
}

.markdown-body :deep(a) {
  color: var(--c-text-3);
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}

.markdown-body :deep(a:hover) {
  color: var(--c-text-1);
}

.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.8em 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 2px solid var(--c-divider);
  margin: 1.5em 0;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.8em 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--c-divider);
  padding: 0.5em 0.8em;
  text-align: left;
}

.markdown-body :deep(th) {
  background: var(--c-accent-soft);
  font-weight: 400;
}
</style>
