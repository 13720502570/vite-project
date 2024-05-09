import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LStorage } from '@/utils/cache'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')

  const getToken = () => token.value || LStorage.get('token')

  const setToken = (data: string) => {
    token.value = data
    LStorage.set('token', token.value, true)
  }

  const removeToken = () => {
    token.value = ''
    LStorage.remove('token')
  }

  return {
    token,
    getToken,
    setToken,
    removeToken
  }
})
