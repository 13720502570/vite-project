import type { Router } from 'vue-router'

import { createPageGuard } from './modules/pageGuard'
import { createStateGuard } from './modules/stateGuard'

export const setupRouterGuard = (router: Router) => {
  createPageGuard(router)
  createStateGuard(router)
}
