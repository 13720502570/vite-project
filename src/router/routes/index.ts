import type { RouteRecordRaw } from 'vue-router'
import type { Recordable } from '@/types'

const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/dashboard'
}

// 菜单
const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
export const routeModuleList: RouteRecordRaw[] = Object.keys(modules).map(
  (key) => (modules[key] as Recordable).default
)

export const routes = [rootRoute, ...routeModuleList]
