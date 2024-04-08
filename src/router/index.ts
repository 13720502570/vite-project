import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routes } from './routes'
import { setupRouterGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  sensitive: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 设置全局路由守卫
setupRouterGuard(router)

export default router
