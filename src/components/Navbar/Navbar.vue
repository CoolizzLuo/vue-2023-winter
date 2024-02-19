<script setup lang="ts">
import { LogIn } from 'lucide-vue-next';
import { buttonVariants } from '@/components/ui/button';
import CartSheet from './CartSheet.vue';
</script>

<template>
  <header class="w-full flex justify-end items-center py-4">
    <div class="flex items-center space-x-8">
      <CartSheet />
      <RouterLink :class="buttonVariants({ variant: 'secondary' })" to="/admin">
        <LogIn class="mr-2 h-4 w-4" />
        <span>管理後台</span>
      </RouterLink>
    </div>
  </header>
</template>
