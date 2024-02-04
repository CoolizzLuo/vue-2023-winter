<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Progress } from '@/components/ui/progress';
import { usePlatformStore } from '@/stores/usePlatformStore';
import { useIsMutating } from '@tanstack/vue-query';

const { isLoading } = storeToRefs(usePlatformStore());

const progressValue = ref(0);
const interval = ref<number>();

const isMutating = useIsMutating();

const isProgressing = computed(() => isLoading.value || isMutating.value);

watch(isProgressing, () => {
  if (isProgressing.value) {
    let progress = 0;
    progressValue.value = 0;
    interval.value = setInterval(() => {
      progress += Math.random() * 10 + 5;
      progressValue.value = Math.min(progress, 90);
    }, 200);
  } else {
    if (interval.value) {
      clearInterval(interval.value);
    }
    progressValue.value = 100;
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <Progress
        v-show="isProgressing"
        :model-value="progressValue"
        class="h-1 rounded-b-none absolute inset-0 z-[99]"
      />
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
