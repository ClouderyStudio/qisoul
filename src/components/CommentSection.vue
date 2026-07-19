<!-- src/components/CommentSection.vue -->
<template>
  <div class="comment-section mt-6">
    <!-- 评论标题 -->
    <div class="flex items-center gap-2 mb-4">
      <span class="text-lg">💬</span>
      <h3
        class="text-sm font-light tracking-wide"
        style="color: var(--c-text-1)"
      >
        评论 <span style="color: var(--c-text-3)">({{ commentCount }})</span>
      </h3>
    </div>

    <!-- 评论输入框 -->
    <div v-if="userStore.isAuthenticated" class="flex gap-3 mb-6">
      <img
        :src="userStore.getAvatar || '/default-avatar.png'"
        alt="头像"
        class="w-8 h-8 rounded-full object-cover flex-shrink-0"
        :style="{ border: '1px solid ' + getVar('--c-border-2') }"
      />
      <div class="flex-1">
        <div class="relative">
          <textarea
            v-model="newComment"
            rows="2"
            class="w-full p-3 pr-20 text-sm transition-all resize-none rounded-[1.5rem]"
            :style="{
              background: 'var(--c-input-bg)',
              border: '1px solid var(--c-border-2)',
              color: 'var(--c-text-content)',
              fontWeight: '300',
              fontFamily: 'Segoe UI',
            }"
            placeholder="写下你的想法..."
            @focus="
              (e) => (e.currentTarget.style.borderColor = 'var(--c-accent)')
            "
            @blur="
              (e) => (e.currentTarget.style.borderColor = 'var(--c-border-2)')
            "
            @keydown.ctrl.enter="submitComment"
          ></textarea>
          <button
            @click="submitComment"
            :disabled="submitting || !newComment.trim()"
            class="absolute right-2 bottom-2 px-4 py-1.5 text-xs font-light transition-all rounded-full disabled:opacity-40"
            :style="{
              background: 'var(--c-btn-bg)',
              color: 'var(--c-text-btn)',
              border: '1px solid var(--c-btn-border)',
            }"
            @mouseenter="
              (e) => {
                if (!submitting && newComment.trim()) {
                  e.currentTarget.style.background = 'var(--c-btn-hover)';
                  e.currentTarget.style.borderColor =
                    'var(--c-btn-border-hover)';
                }
              }
            "
            @mouseleave="
              (e) => {
                if (!submitting) {
                  e.currentTarget.style.background = 'var(--c-btn-bg)';
                  e.currentTarget.style.borderColor = 'var(--c-btn-border)';
                }
              }
            "
          >
            {{ submitting ? "发送中..." : "发送" }}
          </button>
        </div>
        <div class="text-[10px] mt-1" style="color: var(--c-text-3)">
          Ctrl+Enter 快捷发送
        </div>
      </div>
    </div>

    <!-- 未登录提示 -->
    <div
      v-else
      class="p-4 mb-6 text-center rounded-[1.5rem]"
      :style="{
        background: 'var(--c-input-bg)',
        border: '1px solid var(--c-border-2)',
      }"
    >
      <p class="text-sm font-light" style="color: var(--c-text-2)">
        <router-link
          to="/login"
          class="transition-colors"
          style="
            color: var(--c-text-1);
            border-bottom: 1px dotted var(--c-accent);
          "
          @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
          @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
        >
          登录
        </router-link>
        后发表你的想法
      </p>
    </div>

    <!-- 评论列表 -->
    <div v-if="loading" class="text-center py-6">
      <div
        class="w-6 h-6 border-2 border-t-warm-500 border-warm-200 rounded-full animate-spin mx-auto"
      ></div>
      <p class="text-xs font-light mt-2" style="color: var(--c-text-3)">
        加载评论...
      </p>
    </div>

    <div
      v-else-if="comments.length === 0"
      class="text-center py-8"
      style="color: var(--c-text-3); font-size: 13px"
    >
      <span class="text-2xl block mb-2">🌱</span>
      还没有评论，来分享你的想法吧
    </div>

    <div v-else class="space-y-4">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <!-- 主评论 -->
        <div class="flex gap-3">
          <img
            :src="comment.userAvatar || '/default-avatar.png'"
            alt="头像"
            class="w-7 h-7 rounded-full object-cover flex-shrink-0"
            :style="{ border: '1px solid ' + getVar('--c-border-2') }"
            @error="
              (e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.png';
              }
            "
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-light" style="color: var(--c-text-1)">{{
                comment.username
              }}</span>
              <span
                class="text-[10px] font-light"
                style="color: var(--c-text-3)"
                >{{ formatTime(comment.createdAt) }}</span
              >
            </div>
            <p
              class="text-sm font-light leading-relaxed mt-0.5"
              style="color: var(--c-text-content); word-break: break-word"
            >
              {{ comment.content }}
            </p>
            <div class="flex items-center gap-4 mt-1 text-xs">
              <button
                @click="likeComment(comment.id)"
                class="font-light transition-colors flex items-center gap-1"
                style="color: var(--c-text-2)"
                @mouseenter="
                  (e) => (e.currentTarget.style.color = 'var(--c-text-1)')
                "
                @mouseleave="
                  (e) => (e.currentTarget.style.color = 'var(--c-text-2)')
                "
              >
                💛 {{ comment.likes }}
              </button>
              <button
                v-if="userStore.isAuthenticated"
                @click="startReply(comment)"
                class="font-light transition-colors"
                style="color: var(--c-text-2)"
                @mouseenter="
                  (e) => (e.currentTarget.style.color = 'var(--c-text-1)')
                "
                @mouseleave="
                  (e) => (e.currentTarget.style.color = 'var(--c-text-2)')
                "
              >
                回复
              </button>
              <button
                v-if="isMyComment(comment)"
                @click="deleteComment(comment.id)"
                class="font-light transition-colors"
                style="color: var(--c-text-3)"
                @mouseenter="
                  (e) => (e.currentTarget.style.color = 'var(--c-danger)')
                "
                @mouseleave="
                  (e) => (e.currentTarget.style.color = 'var(--c-text-3)')
                "
              >
                删除
              </button>
              <span
                v-if="comment.replyCount && comment.replyCount > 0"
                style="color: var(--c-text-3)"
              >
                {{ comment.replyCount }} 条回复
              </span>
            </div>

            <!-- 回复输入框 -->
            <div v-if="replyingTo === comment.id" class="mt-3">
              <div class="flex gap-2">
                <input
                  v-model="replyContent"
                  type="text"
                  class="flex-1 p-2 text-sm transition-all rounded-full"
                  :style="{
                    background: 'var(--c-input-bg)',
                    border: '1px solid var(--c-border-2)',
                    color: 'var(--c-text-content)',
                    fontWeight: '300',
                    fontFamily: 'Segoe UI',
                    paddingLeft: '1rem',
                  }"
                  :placeholder="'回复 @' + comment.username + '...'"
                  @focus="
                    (e) =>
                      (e.currentTarget.style.borderColor = 'var(--c-accent)')
                  "
                  @blur="
                    (e) =>
                      (e.currentTarget.style.borderColor = 'var(--c-border-2)')
                  "
                  @keydown.enter="submitReply(comment)"
                />
                <button
                  @click="submitReply(comment)"
                  :disabled="replying || !replyContent.trim()"
                  class="px-4 py-1.5 text-xs font-light transition-all rounded-full disabled:opacity-40"
                  :style="{
                    background: 'var(--c-btn-bg)',
                    color: 'var(--c-text-btn)',
                    border: '1px solid var(--c-btn-border)',
                  }"
                  @mouseenter="
                    (e) => {
                      if (!replying && replyContent.trim()) {
                        e.currentTarget.style.background = 'var(--c-btn-hover)';
                        e.currentTarget.style.borderColor =
                          'var(--c-btn-border-hover)';
                      }
                    }
                  "
                  @mouseleave="
                    (e) => {
                      if (!replying) {
                        e.currentTarget.style.background = 'var(--c-btn-bg)';
                        e.currentTarget.style.borderColor =
                          'var(--c-btn-border)';
                      }
                    }
                  "
                >
                  {{ replying ? "发送中..." : "回复" }}
                </button>
                <button
                  @click="cancelReply"
                  class="px-4 py-1.5 text-xs font-light transition-all rounded-full"
                  :style="{
                    background: 'transparent',
                    color: 'var(--c-text-2)',
                    border: '1px solid var(--c-border-2)',
                  }"
                  @mouseenter="
                    (e) => {
                      e.currentTarget.style.borderColor =
                        'var(--c-accent-border)';
                      e.currentTarget.style.color = 'var(--c-text-1)';
                    }
                  "
                  @mouseleave="
                    (e) => {
                      e.currentTarget.style.borderColor = 'var(--c-border-2)';
                      e.currentTarget.style.color = 'var(--c-text-2)';
                    }
                  "
                >
                  取消
                </button>
              </div>
            </div>

            <!-- 子回复列表 -->
            <div
              v-if="comment.replies && comment.replies.length > 0"
              class="mt-3 space-y-3 pl-4"
              :style="{ borderLeft: '2px solid ' + getVar('--c-divider') }"
            >
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="flex gap-3"
              >
                <img
                  :src="reply.userAvatar || '/default-avatar.png'"
                  alt="头像"
                  class="w-6 h-6 rounded-full object-cover flex-shrink-0"
                  :style="{ border: '1px solid ' + getVar('--c-border-2') }"
                  @error="
                    (e) => {
                      (e.target as HTMLImageElement).src =
                        '/default-avatar.png';
                    }
                  "
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="text-sm font-light"
                      style="color: var(--c-text-1)"
                      >{{ reply.username }}</span
                    >
                    <span
                      class="text-[10px] font-light"
                      style="color: var(--c-text-3)"
                      >{{ formatTime(reply.createdAt) }}</span
                    >
                  </div>
                  <p
                    class="text-sm font-light leading-relaxed mt-0.5"
                    style="color: var(--c-text-content); word-break: break-word"
                  >
                    {{ reply.content }}
                  </p>
                  <div class="flex items-center gap-3 mt-1 text-xs">
                    <button
                      @click="likeComment(reply.id)"
                      class="font-light transition-colors flex items-center gap-1"
                      style="color: var(--c-text-2)"
                      @mouseenter="
                        (e) => (e.currentTarget.style.color = 'var(--c-text-1)')
                      "
                      @mouseleave="
                        (e) => (e.currentTarget.style.color = 'var(--c-text-2)')
                      "
                    >
                      💛 {{ reply.likes }}
                    </button>
                    <button
                      v-if="isMyComment(reply)"
                      @click="deleteComment(reply.id)"
                      class="font-light transition-colors"
                      style="color: var(--c-text-3)"
                      @mouseenter="
                        (e) => (e.currentTarget.style.color = 'var(--c-danger)')
                      "
                      @mouseleave="
                        (e) => (e.currentTarget.style.color = 'var(--c-text-3)')
                      "
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多回复 -->
    <div v-if="hasMore && !loading" class="text-center mt-3">
      <button
        @click="loadMore"
        class="text-xs font-light transition-colors"
        style="color: var(--c-text-2)"
        @mouseenter="(e) => (e.currentTarget.style.color = 'var(--c-text-1)')"
        @mouseleave="(e) => (e.currentTarget.style.color = 'var(--c-text-2)')"
      >
        加载更多评论
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { commentService, type CommentResponse } from "@/services/comment";

const props = defineProps<{
  postId: string;
}>();

const userStore = useUserStore();

// ====== 状态 ======
const comments = ref<CommentResponse[]>([]);
const loading = ref(true);
const submitting = ref(false);
const replying = ref(false);
const newComment = ref("");
const replyContent = ref("");
const replyingTo = ref<string | null>(null);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);

// ====== 计算属性 ======
const commentCount = computed(() => {
  return comments.value.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0,
  );
});

const hasMore = computed(() => {
  return comments.value.length < total.value;
});

// ====== 辅助方法 - 获取 CSS 变量值 ======
const getVar = (varName: string): string => {
  // 在浏览器中获取实际计算后的颜色值
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

// ====== 方法 ======
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

const isMyComment = (comment: CommentResponse): boolean => {
  const currentUser = userStore.user?.username;
  return currentUser ? comment.username === currentUser : false;
};

// ====== 加载评论 ======
const loadComments = async () => {
  loading.value = true;
  try {
    const data = await commentService.getCommentsByPost(props.postId);
    comments.value = data;
    total.value = data.length;
  } catch (error) {
    console.error("加载评论失败:", error);
  } finally {
    loading.value = false;
  }
};

const loadMore = async () => {
  await loadComments();
};

// ====== 提交评论 ======
const submitComment = async () => {
  if (!newComment.value.trim() || submitting.value) return;

  submitting.value = true;
  try {
    const comment = await commentService.createComment({
      postId: props.postId,
      content: newComment.value.trim(),
    });
    comments.value.unshift(comment);
    newComment.value = "";
  } catch (error) {
    console.error("提交评论失败:", error);
    alert("评论失败，请重试");
  } finally {
    submitting.value = false;
  }
};

// ====== 回复评论 ======
const startReply = (comment: CommentResponse) => {
  replyingTo.value = comment.id;
  replyContent.value = "";
};

const cancelReply = () => {
  replyingTo.value = null;
  replyContent.value = "";
};

const submitReply = async (parent: CommentResponse) => {
  if (!replyContent.value.trim() || replying.value) return;

  replying.value = true;
  try {
    const reply = await commentService.createComment({
      postId: props.postId,
      content: replyContent.value.trim(),
      parentId: parent.id,
    });
    if (!parent.replies) parent.replies = [];
    parent.replies.push(reply);
    parent.replyCount = (parent.replyCount || 0) + 1;
    cancelReply();
  } catch (error) {
    console.error("回复失败:", error);
    alert("回复失败，请重试");
  } finally {
    replying.value = false;
  }
};

// ====== 点赞 ======
const likeComment = async (id: string) => {
  try {
    const result = await commentService.likeComment(id);
    const updateLikes = (comment: CommentResponse) => {
      if (comment.id === id) {
        comment.likes = result.likes;
        return true;
      }
      if (comment.replies) {
        for (const reply of comment.replies) {
          if (reply.id === id) {
            reply.likes = result.likes;
            return true;
          }
        }
      }
      return false;
    };
    for (const comment of comments.value) {
      if (updateLikes(comment)) break;
    }
  } catch (error) {
    console.error("点赞失败:", error);
  }
};

// ====== 删除评论 ======
const deleteComment = async (id: string) => {
  if (!confirm("确定要删除这条评论吗？")) return;

  try {
    await commentService.deleteComment(id);
    const removeComment = (
      list: CommentResponse[],
      targetId: string,
    ): boolean => {
      const index = list.findIndex((c) => c.id === targetId);
      if (index !== -1) {
        list.splice(index, 1);
        return true;
      }
      for (const c of list) {
        if (c.replies) {
          const subIndex = c.replies.findIndex((r) => r.id === targetId);
          if (subIndex !== -1) {
            c.replies.splice(subIndex, 1);
            c.replyCount = (c.replyCount || 0) - 1;
            return true;
          }
        }
      }
      return false;
    };
    removeComment(comments.value, id);
  } catch (error) {
    console.error("删除失败:", error);
    alert("删除失败，请重试");
  }
};

// ====== 生命周期 ======
onMounted(() => {
  loadComments();
});
</script>

<style scoped>
.comment-item {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--c-divider);
}

.comment-item:last-child {
  border-bottom: none;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}

/* 暗色模式下的输入框占位符适配 */
textarea::placeholder,
input::placeholder {
  color: var(--c-text-3);
}

/* 暗色模式下滚动条适配 */
.comment-section ::-webkit-scrollbar {
  width: 4px;
}

.comment-section ::-webkit-scrollbar-track {
  background: var(--c-bg);
}

.comment-section ::-webkit-scrollbar-thumb {
  background: var(--c-accent);
  border-radius: 9999px;
}
</style>
