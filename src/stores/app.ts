import { defineStore } from 'pinia'
import { useMenu } from './utils/useMenu'
import { useTabs } from './utils/useTabs'
import { usePermission } from './utils/usePermission'

export const useAppStore = defineStore('app', () => {
  const menuStore = useMenu()
  const tabsStore = useTabs()
  const permissionsStore = usePermission()

  const resetAllState = () => {
    menuStore.resetStore()
    tabsStore.resetStore()
  }

  return {
    ...menuStore,
    ...tabsStore,
    ...permissionsStore,
    resetAllState
  }
})
