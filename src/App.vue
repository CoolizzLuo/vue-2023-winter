<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import MaxWidthWrapper from '@/components/MaxWidthWrapper.vue';
</script>

<template>
  <MaxWidthWrapper>
    <RouterView />
  </MaxWidthWrapper>
  <VueQueryDevtools />
</template>
