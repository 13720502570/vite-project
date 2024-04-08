import type { AppRouteRecordRaw } from './type'
import type { Recordable } from '@/types'

// 菜单
const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
export const routeModuleList: AppRouteRecordRaw[] = Object.keys(modules).map(
  (key) => (modules[key] as Recordable).default
)

const rootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root',
  component: () => import('@/layout/index.vue'),
  redirect: '/dashboard',
  meta: {
    title: 'Root'
  },
  children: routeModuleList
}

export const routes = [rootRoute]
