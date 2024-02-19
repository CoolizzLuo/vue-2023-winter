<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { LogOut } from 'lucide-vue-next';
import { useUserStore } from '@/stores/useUserStore';
import { Button, buttonVariants } from '@/components/ui/button';

const router = useRouter();
const userStore = useUserStore();
const { mutate: checkTokenMutate } = userStore.useCheckTokenMutation();
const { mutateAsync: logoutMutate } = userStore.useLogoutMutation();

onMounted(checkTokenMutate);

const handleLogout = async () => {
  await logoutMutate();
  router.push('/');
};
</script>

<template>
  <header class="w-full flex justify-end items-center py-4">
    <div class="flex items-center space-x-4">
      <Button variant="destructive" @click="handleLogout">登出</Button>
      <RouterLink :class="buttonVariants({ variant: 'secondary' })" to="/">
        <LogOut class="mr-2 h-4 w-4" />
        <span>返回前台</span>
      </RouterLink>
    </div>
  </header>
</template>
