<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { buttonVariants } from '.';
import { cn } from '@/lib/utils';

interface Props extends PrimitiveProps {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size'];
  as?: string;
  isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  isLoading: false,
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')">
    <span
      v-if="isLoading"
      class="w-4 h-4 rounded-full animate-spin border-2 border-solid border-blue-300 border-t-transparent"
    />
    <slot v-else />
  </Primitive>
</template>
