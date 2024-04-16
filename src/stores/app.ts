import { defineStore } from 'pinia'
import { useMenu } from './utils/useMenu'
import { useTabs } from './utils/useTabs'

export const useAppStore = defineStore('app', () => {
  return {
    ...useMenu(),
    ...useTabs()
  }
})
