import type { Router } from 'vue-router'

import { createPageGuard } from './modules/pageGuard'
export const setupRouterGuard = (router: Router) => {
  createPageGuard(router)
}
