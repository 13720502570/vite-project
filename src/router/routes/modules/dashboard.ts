import type { AppRouteRecordRaw } from '../type'

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: { name: 'Test' },
  meta: {
    title: 'dashboard'
  },
  children: [
    {
      path: 'test1',
      name: 'Test',
      component: () => import('@/views/dashboard/Test.vue'),
      meta: {
        title: 'test1',
        noCache: true
      }
    },
    {
      path: 'test2',
      name: 'Test2',
      component: () => import('@/views/dashboard/Test2.vue'),
      meta: {
        title: 'test2'
      }
    }
  ]
}

export default dashboard
