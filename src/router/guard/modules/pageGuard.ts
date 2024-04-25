import { routeModuleList } from '@/router/routes'
import { useAppStore } from '@/stores/app'
import type { Router } from 'vue-router'

const whitePathList: string[] = ['/login']

export const createPageGuard = (router: Router) => {
  router.beforeEach((to) => {
    const appStore = useAppStore()
    const token = appStore.getToken()

    if (whitePathList.includes(to.path)) {
      return true
    }

    if (!token) {
      return { path: '/login', replace: true }
    }

    // 页面每次刷新后store丢失，使用浏览器缓存初始化store
    if (!appStore.loaded) {
      appStore.buildRoutesAction(routeModuleList)
      appStore.setLoaded(true)
      appStore.getCachedTabList()
    }
    appStore.setSelectedKeys([to.name as string])
    appStore.addOpenKeys(to.matched.slice(1).map((v) => v.name as string))
    appStore.addTab({
      label: to.meta.title as string,
      key: to.name as string,
      noCache: !!to.meta.noCache
    })
  })
}
