import { ref } from 'vue'
import type { Recordable } from '@/types'
import type { AppRouteRecordRaw } from '@/router/routes/type'

export const useMenu = () => {
  // 将路由转换为系统菜单
  const menus = ref<Recordable[]>([])
  const buildRoutesAction = (routes: AppRouteRecordRaw[]) => {
    const routeToMenu = (routes: AppRouteRecordRaw[]): Recordable[] =>
      routes.map((v) => ({
        label: v.meta.title,
        key: v.name,
        children: v.children?.length ? routeToMenu(v.children) : null,
        meta: v.meta
      })) as Recordable[]
    menus.value = routeToMenu(routes)
  }

  // 菜单是否加载
  const loaded = ref(false)
  const setLoaded = (payload: boolean) => (loaded.value = payload)

  const selectedKeys = ref<string[]>([])
  const setSelectedKeys = (payLoad: string[]) => (selectedKeys.value = payLoad)

  const openKeys = ref<string[]>([])
  const addOpenKeys = (payLoad: string[]) => {
    openKeys.value = Array.from(new Set([...openKeys.value, ...payLoad]))
  }

  return {
    menus,
    buildRoutesAction,
    loaded,
    setLoaded,
    selectedKeys,
    setSelectedKeys,
    openKeys,
    addOpenKeys
  }
}
