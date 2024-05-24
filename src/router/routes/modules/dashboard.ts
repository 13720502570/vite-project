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
    },
    {
      path: 'testLoading',
      name: 'TestLoading',
      component: () => import('@/views/dashboard/TestLoading.vue'),
      meta: {
        title: 'testLoading'
      }
    }
  ]
}

export default dashboard
