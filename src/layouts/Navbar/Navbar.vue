<script setup lang="ts">
import { onMounted } from 'vue';
import {
  ShoppingCart
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/useUserStore';
import { Button, buttonVariants } from '@/components/ui/button';
import UserMenu from './UserMenu.vue';

const userStore = useUserStore();
const { mutateAsync: checkTokenMutate } = userStore.useCheckTokenMutation();

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
    <div class="flex items-center space-x-2">
      <Button variant="ghost" size="sm">
        <ShoppingCart class="h-4 w-4" />
      </Button>
      <UserMenu/>
    </div>
  </header>
</template>

<style lang="" scoped></style>
