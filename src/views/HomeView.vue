<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router';

const { isPending, isFetching, isLoading, refetch, data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: api.test,
});

const { mutateAsync } = useUserStore().useLogoutMutate();

const logoutHandler = async () => {
  await mutateAsync();

  router.push('/login');
};
</script>

<template>
  <main>
    <h1>{Home}</h1>
    <div>isFetching: {{ isFetching }}</div>
    <div>isLoading: {{ isLoading }}</div>
    <Button @click="() => refetch()">refetch</Button>
    <div>{{ JSON.stringify(data?.data) }}</div>
    <Button @click="logoutHandler">Log out</Button>
  </main>
</template>
