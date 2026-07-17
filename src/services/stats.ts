import { api } from './api'

export interface MoodTrend {
  date: string
  avgIntensity: number
  moodType?: string
}

export interface MoodDistribution {
  moodType: string
  moodLabel: string
  count: number
}

export interface StatsResponse {
  totalDays: number
  totalRecords: number
  todayMood: string
  streak: number
  trends: MoodTrend[]
  distribution: MoodDistribution[]
}

export const statsService = {
  // 获取统计数据
  async getStats(days: number = 30, view: string = 'week'): Promise<StatsResponse> {
    const params = new URLSearchParams()
    params.append('days', days.toString())
    params.append('view', view)
    
    const response = await api.get(`/qisoul/stats?${params.toString()}`)
    return response.data.data
  },
}