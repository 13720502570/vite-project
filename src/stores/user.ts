import { defineStore } from 'pinia'
import { ref } from 'vue'
import { StorageType, usePersistent } from '@/utils/persistent'

// 获取持久化对象
const persistent = usePersistent(StorageType.l)

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')

  const getToken = () => token.value || persistent.get('token')

  const setToken = (data: string) => {
    token.value = data
    persistent.set('token', token.value)
  }

  const removeToken = () => {
    token.value = ''
    persistent.remove('token')
  }

  return {
    token,
    getToken,
    setToken,
    removeToken
  }
})
