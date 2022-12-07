import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import '@sakun/system.css'
import './style.css'
import App from './App.vue'

import Intro from './components/Intro.vue'
import About from './components/About.vue'

const routes = [
  { path: '/', component: Intro },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App).use(router).mount('#app')
