import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import Cookie from 'js-cookie';
import api from '@/api';
import router from '@/router';

const TOKEN_KEY = 'token';

export const useUserStore = defineStore('authStore', () => {
  const token = ref<string | null>(Cookie.get(TOKEN_KEY) || null);
  const setToken = (value: string | null) => {
    if (!value) {
      Cookie.remove(TOKEN_KEY);
      token.value = null;
      return;
    }
    Cookie.set(TOKEN_KEY, value);
    token.value = value;
  };

  const useLoginMutation = () =>
    useMutation({
      mutationFn: api.login,
      onSuccess: (res) => {
        setToken(res.data.token);
      },
    });

  const useLogoutMutation = () =>
    useMutation({
      mutationFn: api.logout,
      onSettled: () => {
        setToken(null);
      },
    });

  const useCheckTokenMutation = () =>
    useMutation({
      mutationFn: api.checkToken,
      onError: () => {
        setToken(null);
        router.push('/login');
      },
    });

  // watch(token, (value) => {});
  return { token, setToken, useLoginMutation, useLogoutMutation, useCheckTokenMutation };
});
