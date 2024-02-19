import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import Cookie from 'js-cookie';
import api from '@/api';
import router from '@/router';
import { jwtDecode } from 'jwt-decode';
import { getEmailByJWT } from '@/lib/utils';

const TOKEN_KEY = 'token';

type User = {
  email?: string;
};

export const useUserStore = defineStore('userStore', () => {
  const token = ref<string | null>(Cookie.get(TOKEN_KEY) || null);
  const user = ref<User | null>(
    token.value
      ? {
          email: getEmailByJWT(token.value),
        }
      : null
  );

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
      mutationFn: api.auth.login,
      onSuccess: (res) => {
        setToken(res.data.token);
      },
    });

  const useLogoutMutation = () =>
    useMutation({
      mutationFn: api.auth.logout,
      onSettled: () => {
        setToken(null);
      },
    });

  const useCheckTokenMutation = () =>
    useMutation({
      mutationFn: api.auth.checkToken,
      onSuccess: (res) => {
        if (!res.data?.success) {
          setToken(null);
          router.push('/');
        }
      },
      onError: () => {
        setToken(null);
        router.push('/');
      },
    });

  watch(token, (value) => {
    if (value) {
      user.value = jwtDecode(value);
    } else {
      user.value = null;
    }
  });

  return { token, user, setToken, useLoginMutation, useLogoutMutation, useCheckTokenMutation };
});
