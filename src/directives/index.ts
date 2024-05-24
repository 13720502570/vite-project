import type { App } from 'vue'
import LoadingDirective from './modules/loading'

export default {
  install(app: App) {
    app.directive('loading', LoadingDirective)
  }
}
