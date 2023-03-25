import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/counter',
      name: 'counter',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CounterView.vue')
    },
    {
      path: '/cha-ching',
      name: 'cha-ching',
      component: () => import('../components/HighRoller.vue'),
      beforeEnter: (_to, _from) => {
        const store = useCounterStore();
        if (store.count < 10) {
          return false;
        }
      }
    }
  ]
})

export default router
