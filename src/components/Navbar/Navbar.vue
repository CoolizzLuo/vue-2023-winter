<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { buttonVariants } from '@/components/ui/button';
import UserMenu from './UserMenu.vue';
import CartSheet from './CartSheet.vue';

const userStore = useUserStore();
const { mutate: checkTokenMutate } = userStore.useCheckTokenMutation();

onMounted(() => {
  if (userStore.token) {
    checkTokenMutate();
  }
});
</script>

<template>
  <header class="w-full flex justify-between items-center py-4">
    <RouterLink :class="buttonVariants({ variant: 'link' })" to="/">Logo</RouterLink>
    <nav>
      <ul class="flex gap-4">
        <li>
          <RouterLink :class="buttonVariants({ variant: 'link' })" to="/products">Products</RouterLink>
        </li>
        <li v-if="userStore.token">
          <RouterLink :class="buttonVariants({ variant: 'link' })" to="/admin">Admin</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center space-x-2">
      <CartSheet />
      <UserMenu />
    </div>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  @apply underline;
  @apply font-bold;
}
</style>
