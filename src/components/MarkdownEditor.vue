<!-- src/components/MarkdownEditor.vue -->
<template>
  <div class="markdown-editor">
    <!-- 工具栏 -->
    <div
      class="toolbar flex flex-wrap gap-1 p-2 rounded-t-[1.5rem]"
      style="
        background: var(--c-accent-soft);
        border: 1px solid var(--c-border-2);
        border-bottom: none;
      "
    >
      <button
        v-for="tool in tools"
        :key="tool.key"
        @mousedown.prevent="insertMarkdown(tool.syntax)"
        class="p-1.5 rounded-lg transition-all text-sm hover:bg-warm-100/50"
        style="color: var(--c-text-2); min-width: 32px"
        :title="tool.title"
      >
        <span v-html="tool.icon"></span>
      </button>
      <span class="w-px h-6" style="background: var(--c-border-2)"></span>
      <button
        @click="toggleView"
        class="p-1.5 rounded-lg transition-all text-xs"
        style="color: var(--c-text-3)"
        @mouseenter="
          (e: any) => (e.currentTarget.style.background = 'var(--c-tag-bg)')
        "
        @mouseleave="(e: any) => (e.currentTarget.style.background = 'transparent')"
      >
        {{ isPreview ? "✏️ 编辑" : "👁️ 预览" }}
      </button>
      <span class="text-xs ml-auto" style="color: var(--c-text-4)"
        >{{ charCount }} 字符</span
      >
    </div>

    <!-- 编辑器主体 -->
    <div
      class="editor-body rounded-b-[1.5rem] overflow-hidden"
      style="border: 1px solid var(--c-border-2); background: var(--c-input-bg-light)"
    >
      <!-- 编辑模式 -->
      <textarea
        v-show="!isPreview"
        ref="textareaRef"
        :value="modelValue"
        @input="handleInput"
        @keydown="handleKeydown"
        class="w-full p-4 resize-none outline-none"
        style="
          min-height: 250px;
          background: transparent;
          color: var(--c-text-content);
          font-size: 14px;
          line-height: 1.8;
          font-weight: 300;
          font-family: &quot;Segoe UI&quot;, &quot;Courier New&quot;, monospace;
        "
        :placeholder="placeholder"
      >
      </textarea>

      <!-- 预览模式 -->
      <div
        v-show="isPreview"
        class="preview-content markdown-preview p-4 prose prose-sm max-w-none overflow-auto"
        style="
          min-height: 250px;
          color: var(--c-text-content);
          font-size: 14px;
          line-height: 1.8;
          font-weight: 300;
        "
        v-html="renderedHtml"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { renderMarkdown } from "@/utils/markdown";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isPreview = ref(false);
const charCount = ref(0);

// ====== 渲染 HTML ======
const renderedHtml = computed(() => {
  if (!props.modelValue)
    return '<p style="color: var(--c-text-4); font-style: italic;">没有内容可预览</p>';
  try {
    return renderMarkdown(props.modelValue);
  } catch {
    return '<p style="color: var(--c-text-4);">预览渲染失败</p>';
  }
});

// ====== 输入处理 ======
const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  charCount.value = target.value.length;
};

// ====== 插入 Markdown 语法 ======
const insertMarkdown = (syntax: string) => {
  if (!textareaRef.value) return;

  const textarea = textareaRef.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  let newText = text;
  let cursorOffset = 0;

  // 处理不同类型的语法
  if (syntax === "bold") {
    const selected = text.substring(start, end) || "粗体文字";
    newText =
      text.substring(0, start) + `**${selected}**` + text.substring(end);
    cursorOffset = 2;
  } else if (syntax === "italic") {
    const selected = text.substring(start, end) || "斜体文字";
    newText = text.substring(0, start) + `*${selected}*` + text.substring(end);
    cursorOffset = 1;
  } else if (syntax === "strike") {
    const selected = text.substring(start, end) || "删除线文字";
    newText =
      text.substring(0, start) + `~~${selected}~~` + text.substring(end);
    cursorOffset = 2;
  } else if (syntax === "code") {
    const selected = text.substring(start, end) || "代码";
    newText =
      text.substring(0, start) + `\`${selected}\`` + text.substring(end);
    cursorOffset = 1;
  } else if (syntax === "h1") {
    newText = text.substring(0, start) + `\n# ` + text.substring(start);
    cursorOffset = 3;
  } else if (syntax === "h2") {
    newText = text.substring(0, start) + `\n## ` + text.substring(start);
    cursorOffset = 4;
  } else if (syntax === "h3") {
    newText = text.substring(0, start) + `\n### ` + text.substring(start);
    cursorOffset = 5;
  } else if (syntax === "ul") {
    const selected = text.substring(start, end) || "列表项";
    newText =
      text.substring(0, start) + `\n- ${selected}` + text.substring(end);
    cursorOffset = 3;
  } else if (syntax === "ol") {
    const selected = text.substring(start, end) || "列表项";
    newText =
      text.substring(0, start) + `\n1. ${selected}` + text.substring(end);
    cursorOffset = 4;
  } else if (syntax === "quote") {
    const selected = text.substring(start, end) || "引用内容";
    newText =
      text.substring(0, start) + `\n> ${selected}` + text.substring(end);
    cursorOffset = 3;
  } else if (syntax === "codeblock") {
    const selected = text.substring(start, end) || "代码内容";
    newText =
      text.substring(0, start) +
      `\n\`\`\`\n${selected}\n\`\`\`` +
      text.substring(end);
    cursorOffset = 4;
  } else if (syntax === "link") {
    const url = prompt("输入链接地址:");
    if (url) {
      const selected = text.substring(start, end) || "链接文字";
      newText =
        text.substring(0, start) +
        `[${selected}](${url})` +
        text.substring(end);
      cursorOffset = 1;
    } else {
      return;
    }
  } else if (syntax === "image") {
    const url = prompt("输入图片地址:");
    if (url) {
      const alt = prompt("输入图片描述:") || "图片";
      newText =
        text.substring(0, start) + `![${alt}](${url})` + text.substring(end);
      cursorOffset = 2;
    } else {
      return;
    }
  } else {
    // 直接插入
    newText = text.substring(0, start) + syntax + text.substring(end);
    cursorOffset = syntax.length;
  }

  emit("update:modelValue", newText);
  charCount.value = newText.length;

  // 恢复光标位置
  nextTick(() => {
    if (textareaRef.value) {
      const newPos = start + cursorOffset;
      textareaRef.value.selectionStart = newPos;
      textareaRef.value.selectionEnd = newPos;
      textareaRef.value.focus();
    }
  });
};

// ====== 键盘快捷键 ======
const handleKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "b":
        e.preventDefault();
        insertMarkdown("bold");
        break;
      case "i":
        e.preventDefault();
        insertMarkdown("italic");
        break;
      case "k":
        e.preventDefault();
        insertMarkdown("link");
        break;
    }
  }
  // Tab 键插入空格
  if (e.key === "Tab") {
    e.preventDefault();
    const textarea = textareaRef.value;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newText = text.substring(0, start) + "  " + text.substring(end);
    emit("update:modelValue", newText);
    nextTick(() => {
      textarea.selectionStart = start + 2;
      textarea.selectionEnd = start + 2;
    });
  }
};

// ====== 切换预览 ======
const toggleView = () => {
  isPreview.value = !isPreview.value;
};

// src/components/MarkdownEditor.vue - tools 定义
const tools = ref([
  { key: "bold", icon: "<b>B</b>", title: "粗体 (Ctrl+B)", syntax: "bold" },
  { key: "italic", icon: "<i>I</i>", title: "斜体 (Ctrl+I)", syntax: "italic" },
  { key: "strike", icon: "<s>S</s>", title: "删除线", syntax: "strike" },
  { key: "code", icon: "&lt;/&gt;", title: "行内代码", syntax: "code" },
  { key: "h1", icon: "H1", title: "一级标题", syntax: "h1" },
  { key: "h2", icon: "H2", title: "二级标题", syntax: "h2" },
  { key: "h3", icon: "H3", title: "三级标题", syntax: "h3" },
  { key: "ul", icon: "•", title: "无序列表", syntax: "ul" },
  { key: "ol", icon: "1.", title: "有序列表", syntax: "ol" },
  { key: "quote", icon: '"', title: "引用", syntax: "quote" },
  { key: "codeblock", icon: "{ }", title: "代码块", syntax: "codeblock" },
  { key: "link", icon: "🔗", title: "链接 (Ctrl+K)", syntax: "link" },
  { key: "image", icon: "🖼️", title: "图片", syntax: "image" },
]);

// ====== 监听外部值变化 ======
watch(
  () => props.modelValue,
  (newValue) => {
    charCount.value = newValue?.length || 0;
  },
  { immediate: true },
);
</script>

<style scoped>
.markdown-editor {
  width: 100%;
}

.toolbar button:hover {
  background: var(--c-tag-bg);
}

.editor-body textarea::placeholder {
  color: var(--c-text-4);
}

/* 预览样式 */
.preview-content {
  font-family:
    "Segoe UI",
    system-ui,
    -apple-system,
    sans-serif;
}

.preview-content :deep(h1) {
  font-size: 1.8em;
  font-weight: 300;
  margin: 1em 0 0.5em;
  color: var(--c-text-1);
}

.preview-content :deep(h2) {
  font-size: 1.5em;
  font-weight: 300;
  margin: 0.8em 0 0.4em;
  color: var(--c-text-1);
}

.preview-content :deep(h3) {
  font-size: 1.2em;
  font-weight: 300;
  margin: 0.6em 0 0.3em;
  color: var(--c-text-1);
}

.preview-content :deep(blockquote) {
  border-left: 4px solid var(--c-accent);
  padding: 0.5em 1em;
  margin: 0.5em 0;
  color: var(--c-text-2);
  font-style: italic;
  background: var(--c-accent-soft);
  border-radius: 0 8px 8px 0;
}

.preview-content :deep(code) {
  background: var(--c-tag-bg);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--c-text-1);
}

.preview-content :deep(pre) {
  background: var(--c-tag-bg);
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0.5em 0;
}

.preview-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.preview-content :deep(a) {
  color: var(--c-text-3);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.preview-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.5em 0;
}

.preview-content :deep(p) {
  margin: 0.5em 0;
}

.preview-content :deep(hr) {
  border: none;
  border-top: 2px solid var(--c-divider);
  margin: 1.5em 0;
}

.preview-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.5em 0;
}

.preview-content :deep(th),
.preview-content :deep(td) {
  border: 1px solid var(--c-divider);
  padding: 0.4em 0.8em;
}

.preview-content :deep(th) {
  background: var(--c-accent-soft);
  font-weight: 400;
}

/* 滚动条 */
.preview-content::-webkit-scrollbar,
.editor-body textarea::-webkit-scrollbar {
  width: 4px;
}

.preview-content::-webkit-scrollbar-track,
.editor-body textarea::-webkit-scrollbar-track {
  background: transparent;
}

.preview-content::-webkit-scrollbar-thumb,
.editor-body textarea::-webkit-scrollbar-thumb {
  background: var(--c-accent);
  border-radius: 9999px;
}
</style>
