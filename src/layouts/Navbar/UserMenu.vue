<script setup lang="ts">
import {
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  User,
} from 'lucide-vue-next'

import router from '@/router';
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUserStore } from '@/stores/useUserStore';

const userStore = useUserStore();
const { mutateAsync: logoutMutate } = userStore.useLogoutMutation();

const logoutHandler = async () => {
  await logoutMutate();

  router.push('/login');
};


</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm">
        <User class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>{{ userStore.user?.email || 'John doe' }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Github class="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <Cloud class="mr-2 h-4 w-4" />
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="logoutHandler">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>