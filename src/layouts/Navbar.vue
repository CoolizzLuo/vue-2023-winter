<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router';
import { Button, buttonVariants } from '@/components/ui/button';

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
  <header class="w-full flex justify-between items-center py-2">
    <nav>
      <ul class="flex gap-4">
        <li>
          <RouterLink :class="buttonVariants({ variant: 'secondary' })" to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink :class="buttonVariants({ variant: 'secondary' })" to="/products">Products</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="space-x-2">
      <Button variant="outline">Cart</Button>
      <Button variant="outline" @click="logoutHandler">Log out</Button>
    </div>
  </header>
</template>

<style lang="" scoped></style>
