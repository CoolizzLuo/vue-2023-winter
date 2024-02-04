import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlatformStore = defineStore('platformStore', () => {
  const isLoading = ref(false);

  return { isLoading };
});
