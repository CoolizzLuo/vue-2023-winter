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
  <header class="w-full flex justify-between items-center py-4">
    <nav>
      <ul class="flex gap-4">
        <li>
          <RouterLink custom to="/admin" v-slot="{ isActive }">
            <Button variant="link" :class="{ 'font-black underline text-base': isActive }"> 產品列表 </Button>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center space-x-4">
      <Button variant="destructive" @click="handleLogout">登出</Button>
      <RouterLink :class="buttonVariants({ variant: 'secondary' })" to="/">
        <LogOut class="mr-2 h-4 w-4" />
        <span>返回前台</span>
      </RouterLink>
    </div>
  </header>
</template>
