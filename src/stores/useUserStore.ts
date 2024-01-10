import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useMutation, type MutationObserverOptions } from '@tanstack/vue-query';
import Cookie from 'js-cookie';
import api from '@/api';

const TOKEN_KEY = 'token';

interface UserStore {
  token: Ref<string | null>;
  useLoginMutate: any;
  useLogoutMutate: any;
}

export const useUserStore = defineStore<string, UserStore>('authStore', () => {
  const token = ref<string | null>(Cookie.get(TOKEN_KEY) || null);

  const useLoginMutate = () => useMutation({
    mutationFn: api.login,
    onSuccess: (res) => {
      const resToken = res.data.token;
      Cookie.set(TOKEN_KEY, resToken);
      token.value = resToken;
    },
  });

  const useLogoutMutate = () => useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      Cookie.remove(TOKEN_KEY);
      token.value = null;
    },
  });

  return { token, useLoginMutate, useLogoutMutate };
});
