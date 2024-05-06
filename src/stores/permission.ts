import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Recordable } from '@/types'
import type { AppRouteRecordRaw } from '@/router/routes/type'
import { routeModuleList } from '@/router/routes'

export const usePermissionStore = defineStore('permission', () => {
  // 菜单是否加载
  const loaded = ref(false)

  const menus = ref<Recordable[]>([])

  // 将路由转换为系统菜单
  const buildRoutesAction = () => {
    const routeToMenu = (routes: AppRouteRecordRaw[]): Recordable[] =>
      routes.map((v) => ({
        label: v.meta.title,
        key: v.name,
        children: v.children?.length ? routeToMenu(v.children) : null,
        meta: v.meta
      })) as Recordable[]

    const routes: AppRouteRecordRaw[] = routeModuleList
    menus.value = routeToMenu(routes)
    loaded.value = true
  }

  const resetStore = () => {
    loaded.value = false
    menus.value = []
  }

  return {
    loaded,
    menus,
    buildRoutesAction,
    resetStore
  }
})
