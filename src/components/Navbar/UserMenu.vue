<script setup lang="ts">
import { computed } from 'vue';
import { LogIn, LogOut, User } from 'lucide-vue-next';
import router from '@/router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const { mutate: logoutMutate } = userStore.useLogoutMutation();

const userName = computed(() => {
  if (userStore.user) {
    return userStore.user.email;
  } else {
    return 'Guest';
  }
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <User class="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>{{ userName }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-if="!userStore.token" class="cursor-pointer" @click="() => router.push('/login')">
        <LogIn class="mr-2 h-4 w-4" />
        <span>Log In</span>
      </DropdownMenuItem>
      <DropdownMenuItem v-else class="cursor-pointer" @click="logoutMutate">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
