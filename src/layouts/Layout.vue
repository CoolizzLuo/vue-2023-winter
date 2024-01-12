<script setup lang="ts">
import MaxWidthWrapper from '@/components/MaxWidthWrapper.vue';
import Navbar from '@/layouts/Navbar';
</script>

<template>
  <MaxWidthWrapper>
    <Navbar />
    <RouterView />
  </MaxWidthWrapper>
</template>
