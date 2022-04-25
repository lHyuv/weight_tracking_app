import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: import('../views/Home.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: import('../views/Table.vue')
  },
  {
    path: '/graph',
    name: 'Graph',
    component: import('../views/Graph.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: import('../views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
