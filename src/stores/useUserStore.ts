import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import Cookie from 'js-cookie';
import api from '@/api';
import router from '@/router';

const TOKEN_KEY = 'token';

export const useUserStore = defineStore('authStore', () => {
  const token = ref<string | null>(Cookie.get(TOKEN_KEY) || null);

  const useLoginMutation = () =>
    useMutation({
      mutationFn: api.login,
      onSuccess: (res) => {
        const resToken = res.data.token;
        token.value = resToken;
      },
    });

  const useLogoutMutation = () =>
    useMutation({
      mutationFn: api.logout,
      onSuccess: () => {
        token.value = null;
      },
    });

  const useCheckTokenMutation = () =>
    useMutation({
      mutationFn: api.checkToken,
      onError: () => {
        token.value = null;
        router.push('/login');
      },
    });

  watch(token, (value) => {
    if (value) {
      Cookie.set(TOKEN_KEY, value);
    } else {
      Cookie.remove(TOKEN_KEY);
    }
  });
  return { token, useLoginMutation, useLogoutMutation, useCheckTokenMutation };
});
