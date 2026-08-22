/**
 * 相对时间格式化（中文）。
 * 对非法日期做防护，避免输出 "NaN月NaN日"。
 */
export const formatTime = (dateStr?: string | null): string => {
  if (!dateStr) return '刚刚'
  const date = new Date(dateStr)
  const time = date.getTime()
  if (Number.isNaN(time)) return dateStr

  const diff = Date.now() - time
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 172800000) return '昨天'
  if (diff < 259200000) return '前天'
  return `${date.getMonth() + 1}月${date.getDate()}日`
}