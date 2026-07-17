import { api } from './api'

export interface MoodRecord {
  id?: string
  moodType: string
  moodLabel?: string
  intensity: number
  note?: string
  diary?: string
  tags?: string
  recordDate?: string
}

export interface MoodRecordResponse {
  id: string
  moodType: string
  moodLabel: string
  intensity: number
  note?: string
  diary?: string
  tags?: string
  recordDate: string
  createdAt: string
  username?: string
}

export interface MoodListResponse {
  success: boolean
  data: MoodRecordResponse[]
}

export const moodService = {
  // 获取心情记录列表
  async getRecords(days: number = 30, startDate?: string, endDate?: string): Promise<MoodRecordResponse[]> {
    const params = new URLSearchParams()
    params.append('days', days.toString())
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    const response = await api.get(`/qisoul/mood?${params.toString()}`)
    return response.data.data
  },

  // 获取单条心情记录
  async getRecord(id: string): Promise<MoodRecordResponse> {
    const response = await api.get(`/qisoul/mood/${id}`)
    return response.data.data
  },

  // 创建心情记录
  async createRecord(data: MoodRecord): Promise<MoodRecordResponse> {
    const response = await api.post('/qisoul/mood', data)
    return response.data.data
  },

  // 更新心情记录
  async updateRecord(id: string, data: MoodRecord): Promise<void> {
    await api.put(`/qisoul/mood/${id}`, data)
  },

  // 删除心情记录
  async deleteRecord(id: string): Promise<void> {
    await api.delete(`/qisoul/mood/${id}`)
  },
}