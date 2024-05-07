import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useMultipleTabStore } from '@/stores/multipleTab'

export const createProgressGuard = (router: Router) => {
  router.beforeEach((to) => {
    const { cachedMenu } = useMultipleTabStore()
    if (!cachedMenu.includes(to.name as string)) {
      nProgress.start()
    }
  })
  router.afterEach(() => {
    nProgress.done()
  })
}
