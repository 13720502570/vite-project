import type { AppRouteRecordRaw } from '../type'

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard/test1',
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
    },
    {
      path: 'test3',
      name: 'test3',
      meta: {
        title: 'test3'
      },
      children: [
        {
          path: 'test4',
          name: 'test4',
          component: () => import('@/views/dashboard/Test.vue'),
          meta: {
            title: 'test4'
          }
        }
      ]
    },
    {
      path: 'test5',
      name: 'test5',
      meta: {
        title: 'test5'
      },
      children: [
        {
          path: 'test6',
          name: 'test6',
          component: () => import('@/views/dashboard/Test2.vue'),
          meta: {
            title: 'test6'
          }
        }
      ]
    }
  ]
}

export default dashboard
