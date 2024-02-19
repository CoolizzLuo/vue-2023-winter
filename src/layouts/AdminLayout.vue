<script setup lang="ts">
import AdminNavbar from '@/components/AdminNavbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
</script>

<template>
  <LoadingIndicator />
  <MaxWidthWrapper>
    <AdminNavbar />
    <div class="py-4">
      <RouterView />
    </div>
  </MaxWidthWrapper>
</template>
