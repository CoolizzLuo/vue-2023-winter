<script setup lang="ts">
import { buttonVariants } from '@/components/ui/button';
import UserMenu from './UserMenu.vue';
import CartSheet from './CartSheet.vue';
</script>

<template>
  <header class="w-full flex justify-between items-center py-4">
    <nav>
      <ul class="flex gap-4">
        <li>
          <RouterLink :class="buttonVariants({ variant: 'link' })" to="/">Home</RouterLink>
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
