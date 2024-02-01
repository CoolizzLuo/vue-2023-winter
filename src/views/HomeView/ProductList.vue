<script setup lang="ts">
import { useToast } from '@/components/ui/toast/useToast';
import Product from './Product.vue';

const props = defineProps<{
  data: any[];
}>();

const { toast } = useToast();

const handleAddToCart = (id: string) => {
  toast({
    title: 'Added to cart ' + id,
    description: 'Product 1 has been added to your cart',
  });
};
</script>

<template>
  <ul class="flex flex-wrap gap-4 items-center">
    <li v-for="number in props.data" :key="number">
      <Product
        id="1"
        title="Product 1"
        description="This is a product description"
        imagesUrl="https://images.unsplash.com/photo-1704972841788-86fac20fc87e?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        :originalPrice="100"
        :salePrice="50"
        @addToCart="() => handleAddToCart('1')"
      />
    </li>
  </ul>
</template>
