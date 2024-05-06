import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { useMultipleTabStore } from '@/stores/multipleTab'
import type { Router } from 'vue-router'

const whitePathList: string[] = ['/login']

export const createPageGuard = (router: Router) => {
  router.beforeEach((to) => {
    if (whitePathList.includes(to.path)) {
      return true
    }

    const userStore = useUserStore()
    const token = userStore.getToken()
    if (!token) {
      return { path: '/login', replace: true }
    }

    // 页面每次刷新后重新加载菜单
    const permissionStore = usePermissionStore()
    if (!permissionStore.loaded) {
      permissionStore.buildRoutesAction()
    }

    const multipleTabStore = useMultipleTabStore()
    multipleTabStore.addTab({
      route: to,
      label: to.meta.title as string,
      key: to.name as string,
      noCache: !!to.meta.noCache
    })
  })
}
