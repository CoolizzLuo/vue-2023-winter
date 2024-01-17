<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import MaxWidthWrapper from '@/components/MaxWidthWrapper.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <MaxWidthWrapper>
    <RouterView />
  </MaxWidthWrapper>
  <Toaster />
  <VueQueryDevtools />
</template>
