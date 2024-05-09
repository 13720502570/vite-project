import { defineStore } from 'pinia'
import { SStorage } from '@/utils/cache'

export const useAppStore = defineStore('app', () => {
  const resetAllState = () => {
    SStorage.clear()
  }

  return {
    resetAllState
  }
})
