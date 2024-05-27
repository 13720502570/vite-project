import '@/styles/index.less'
import 'virtual:uno.css'

import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import globalDirectives from './directives'

const app = createApp(App)

app.use(IonicVue)
app.use(createPinia())
app.use(router)
app.use(globalDirectives)

router.isReady().then(() => {
  app.mount('#app')
})
