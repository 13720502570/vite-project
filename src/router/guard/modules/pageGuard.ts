import { routeModuleList } from '@/router/routes'
import { useAppStore } from '@/stores/app'
import type { Router } from 'vue-router'

export const createPageGuard = (router: Router) => {
  router.beforeEach((to) => {
    const appStore = useAppStore()
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
