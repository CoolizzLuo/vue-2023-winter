<script setup lang="ts">
import MaxWidthWrapper from '@/components/MaxWidthWrapper.vue';
import Navbar from '@/layouts/Navbar.vue';
</script>

<template>
  <MaxWidthWrapper>
    <Navbar />
    <RouterView />
  </MaxWidthWrapper>
</template>

<style lang="" scoped></style>
