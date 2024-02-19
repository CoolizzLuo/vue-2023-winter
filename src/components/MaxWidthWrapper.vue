<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps({
  className: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div :class="cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-16', className)">
    <slot />
  </div>
</template>
