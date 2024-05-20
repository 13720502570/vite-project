import type { AppRouteRecordRaw } from '../type'

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: { name: 'TestRoute' },
  meta: {
    title: 'dashboard'
  },
  children: [
    {
      path: 'testRoute',
      name: 'TestRoute',
      component: () => import('@/views/dashboard/TestRoute.vue'),
      meta: {
        title: 'testRoute'
      }
    }
  ]
}

export default dashboard
