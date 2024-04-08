import { defineStore } from 'pinia'
import { useMenu } from './utils/useMenu'

export const useAppStore = defineStore('app', () => {
  return {
    ...useMenu()
  }
})
