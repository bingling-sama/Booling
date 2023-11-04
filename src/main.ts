import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import '@sakun/system.css'
import App from './App.vue'

import Intro from './components/Intro.vue'
import About from './components/About.vue'

const routes = [
  { path: '/', component: Intro },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
