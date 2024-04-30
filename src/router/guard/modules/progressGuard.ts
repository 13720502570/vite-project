import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const createProgressGuard = (router: Router) => {
  // TODO: 已缓存路由不再触发进度条
  router.beforeEach(() => {
    nProgress.start()
  })
  router.afterEach(() => {
    nProgress.done()
  })
}
