<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router';
import { onMounted } from 'vue';

const { mutateAsync: checkTokenMutate } = useUserStore().useCheckTokenMutation();
const { mutateAsync: logoutMutate } = useUserStore().useLogoutMutation();

const logoutHandler = async () => {
  await logoutMutate();

  router.push('/login');
};

onMounted(async () => {
  await checkTokenMutate();
});
</script>

<template>
  <main>
    <h1>{Home}</h1>
    <Button @click="logoutHandler">Log out</Button>
  </main>
</template>
