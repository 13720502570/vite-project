import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
import { useMultipleTabStore } from '@/stores/multipleTab'
import type { Router } from 'vue-router'

export const createStateGuard = (router: Router) => {
  router.afterEach((to) => {
    const appStore = useAppStore()
    const permissionStore = usePermissionStore()
    const multipleTabStore = useMultipleTabStore()

    if (to.path === '/login') {
      appStore.resetAllState()
      permissionStore.resetStore()
      multipleTabStore.resetStore()
    }
  })
}
