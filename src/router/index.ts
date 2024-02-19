import { createRouter, createWebHistory, type NavigationGuard } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
import Layout from '@/layouts/Layout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import HomeView from '@/views/HomeView';
import NotFoundView from '@/views/NotFoundView.vue';

const authGuard: NavigationGuard = async (to, _, next) => {
  const { token } = useUserStore();

  if (to.name === 'login' && token) {
    next({ name: 'admin' });
  } else if (to.name !== 'login' && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
};

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
          path: '/:notFound',
          name: 'not-found',
          component: NotFoundView,
        },
      ],
    },
    {
      path: '/admin',
      beforeEnter: authGuard,
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import('@/views/AdminView'),
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

export default router;
