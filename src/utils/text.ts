/**
 * 截断文本，添加省略号
 * @param text 原始文本
 * @param maxLength 最大长度（默认 100 字符）
 * @param suffix 后缀（默认 '...'）
 */
export const truncateText = (text: string, maxLength: number = 100, suffix: string = '...'): string => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + suffix
}

/**
 * 按行数截断文本
 * @param text 原始文本
 * @param maxLines 最大行数（默认 3 行）
 */
export const truncateByLines = (text: string, maxLines: number = 3): string => {
    if (!text) return ''
    const lines = text.split('\n')
    if (lines.length <= maxLines) return text
    return lines.slice(0, maxLines).join('\n') + '\n...'
}

/**
 * 获取文本的字数（中英文混合）
 */
export const getWordCount = (text: string): number => {
    if (!text) return 0
    // 移除换行和多余空格
    const clean = text.replace(/\s+/g, ' ').trim()
    // 中文字符计数，英文字符按单词计数
    const chinese = (clean.match(/[\u4e00-\u9fa5]/g) || []).length
    const english = (clean.match(/[a-zA-Z]+/g) || []).length
    return chinese + english
}

/**
 * 智能截断：优先按句子截断，再按字符
 */
export const truncateSmart = (text: string, maxLength: number = 100): string => {
    if (!text) return ''
    if (text.length <= maxLength) return text

    // 尝试在句号、问号、感叹号处截断
    const sentenceEnd = /[。！？.!?]\s*/g
    let match
    let lastMatchIndex = 0
    while ((match = sentenceEnd.exec(text)) !== null) {
        if (match.index + 1 <= maxLength) {
            lastMatchIndex = match.index + 1
        } else {
            break
        }
    }

    if (lastMatchIndex > 0) {
        return text.substring(0, lastMatchIndex) + '...'
    }

    // 找不到合适的句子边界，直接截断
    return text.substring(0, maxLength) + '...'
}

/**
 * 从 Markdown 中提取纯文本（用于列表预览）
 */
export const stripMarkdown = (markdown: string): string => {
    if (!markdown) return ''
    let text = markdown
    // 移除图片 ![alt](url)
    text = text.replace(/!\[.*?\]\(.*?\)/g, '')
    // 移除链接 [text](url)
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除标题 # 
    text = text.replace(/^#+\s+/gm, '')
    // 移除粗体 **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '$1')
    // 移除斜体 *text*
    text = text.replace(/\*(.*?)\*/g, '$1')
    // 移除代码块 ```code```
    text = text.replace(/```[\s\S]*?```/g, '')
    // 移除行内代码 `code`
    text = text.replace(/`([^`]+)`/g, '$1')
    // 移除引用 > 
    text = text.replace(/^>\s+/gm, '')
    // 移除列表标记 - 和数字
    text = text.replace(/^[\s]*[-*+]\s+/gm, '')
    text = text.replace(/^[\s]*\d+\.\s+/gm, '')
    // 移除多余空行
    text = text.replace(/\n{3,}/g, '\n\n')
    return text.trim()
}