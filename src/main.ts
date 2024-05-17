import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { createHead } from 'unhead'
import Toast from 'vue-toastification'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import App from './App.vue'
import generatedRoutes from '~pages'
import 'vue-toastification/dist/index.css'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Create a global head instance
const head = createHead()
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(Toast).use(pinia)

const modules: any = import.meta.glob('./modules/*.ts', { eager: true })
for (const path in modules)
  modules[path].install({ app })

app.mount('#app')
