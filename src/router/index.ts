import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import Layout from '@/layouts/Layout.vue';
import HomeView from '@/views/HomeView';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/ProductsView.vue'),
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('@/views/AdminView'),
        },
        {
          path: '/:notFound',
          name: 'not-found',
          component: NotFoundView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
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
