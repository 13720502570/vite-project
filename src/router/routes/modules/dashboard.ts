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
    },
    {
      path: 'test3',
      name: 'Test3',
      redirect: { name: 'Test4' },
      meta: {
        title: 'test3'
      },
      children: [
        {
          path: 'test4',
          name: 'Test4',
          component: () => import('@/views/dashboard/Test.vue'),
          meta: {
            title: 'test4'
          }
        }
      ]
    },
    {
      path: 'test5',
      name: 'Test5',
      redirect: { name: 'Test6' },
      meta: {
        title: 'test5'
      },
      children: [
        {
          path: 'test6',
          name: 'Test6',
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
