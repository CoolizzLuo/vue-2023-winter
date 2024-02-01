<script setup lang="ts">
import { h } from 'vue';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/useToast';
import { ToastAction } from '@/components/ui/toast';
import ProductList from './ProductList.vue';

const { toast } = useToast();
</script>

<template>
  <ProductList :data="[1, 2, 3, 4, 5]" />
</template>
