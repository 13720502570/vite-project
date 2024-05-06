import { defineStore } from 'pinia'
import { StorageType, usePersistent } from '@/utils/persistent'

// 获取持久化对象
const persistent = usePersistent(StorageType.s)

export const useAppStore = defineStore('app', () => {
  const resetAllState = () => {
    persistent.clear()
  }

  return {
    resetAllState
  }
})
