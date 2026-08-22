import { marked } from 'marked'
import DOMPurify from 'dompurify'

/**
 * 统一的 Markdown 安全渲染。
 *
 * 安全策略：
 * - 禁止 iframe / object / embed / form / 表单控件等危险标签（存储型 XSS 入口）；
 * - 禁止 srcdoc / style 属性，避免内联脚本与样式注入；
 * - 所有带 target 的链接强制补 rel="noopener noreferrer"，防止 tabnabbing。
 */
DOMPurify.addHook('afterSanitizeAttributes', (node: Element) => {
  if (node.tagName === 'A' && node.hasAttribute('target')) {
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export const renderMarkdown = (source: string): string => {
  // 未注册任何异步扩展，marked 实际为同步渲染；类型签名返回 string | Promise<string，这里断言为同步结果
  const rawHtml = marked.parse(source, { async: false }) as string
  return DOMPurify.sanitize(rawHtml, {
    FORBID_TAGS: [
      'iframe',
      'object',
      'embed',
      'form',
      'input',
      'button',
      'textarea',
      'select',
      'style',
    ],
    FORBID_ATTR: ['srcdoc', 'style'],
  })
}