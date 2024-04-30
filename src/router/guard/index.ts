import type { Router } from 'vue-router'

import { createProgressGuard } from './modules/progressGuard'
import { createPageGuard } from './modules/pageGuard'
import { createStateGuard } from './modules/stateGuard'

export const setupRouterGuard = (router: Router) => {
  createProgressGuard(router)
  createPageGuard(router)
  createStateGuard(router)
}
