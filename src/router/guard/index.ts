import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useMultipleTabStore } from '@/stores/multipleTab'
import { requestContainer } from '@/utils/http/RequestContainer'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'

import { createPageGuard } from './modules/pageGuard'

export const setupRouterGuard = (router: Router) => {
  // 导航条设置
  createProgressGuard(router)
  // 页面切换时取消已发送的请求
  createHttpGuard(router)
  // 校验权限，构建菜单，保存页签
  createPageGuard(router)
  // 跳转登录页面时清除本地所有缓存
  createStateGuard(router)
}

const createProgressGuard = (router: Router) => {
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

const createHttpGuard = (router: Router) => {
  router.beforeEach(() => {
    requestContainer.removeAllRequest()
  })
}

const createStateGuard = (router: Router) => {
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
