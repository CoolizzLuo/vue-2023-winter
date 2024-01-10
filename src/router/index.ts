import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/useUserStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const { token } = useUserStore();

  if (to.name === 'login' && token) {
    next({ name: 'home' });
  } else if (to.name !== 'login' && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
