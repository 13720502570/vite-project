import { useAppStore } from '@/stores/app'
import type { Router } from 'vue-router'

export const createStateGuard = (router: Router) => {
  router.afterEach((to) => {
    const appStore = useAppStore()
    if (to.path === '/login') {
      appStore.resetAllState()
    }
  })
}
