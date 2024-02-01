<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import { useQuery } from '@tanstack/vue-query';
import { useToast } from '@/components/ui/toast/useToast';
import Product from './Product.vue';
import api from '@/api';

const { toast } = useToast();

const { data: products, isLoading } = useQuery({
  queryKey: ['customer', 'products'],
  queryFn: async () => {
    try {
      const res = await api.customer.products.getProducts();
      console.log('res', res);
      return res.data.products;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  },
});

const handleAddToCart = (id: string) => {
  toast({
    title: 'Added to cart ' + id,
    description: 'Product 1 has been added to your cart',
  });
};
</script>

<template>
  <div class="vl-parent" v-if="!products">
    <Loading v-model:active="isLoading" :is-full-page="true" />
  </div>
  <ul class="flex flex-wrap gap-4 items-center" v-else>
    <li class="flex-1 max-w-72" v-for="product in products" :key="product.id">
      <Product
        :title="product.title"
        :description="product.description"
        :imagesUrl="product.imageUrl"
        :originalPrice="product.origin_price"
        :salePrice="product.price"
        @addToCart="() => handleAddToCart(product.id)"
      />
    </li>
  </ul>
</template>
