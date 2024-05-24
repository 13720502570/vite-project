import '@/styles/index.less'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import globalDirectives from './directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(globalDirectives)

app.mount('#app')
