<script setup lang="ts">
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
</script>

<template>
  <LoadingIndicator />
  <MaxWidthWrapper>
    <Navbar />
    <div class="py-4">
      <RouterView />
    </div>
  </MaxWidthWrapper>
</template>
