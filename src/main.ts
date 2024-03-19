import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:uno.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', component: () => import('./views/MainView.vue') }],
})

createApp(App).use(router).mount('#app')
