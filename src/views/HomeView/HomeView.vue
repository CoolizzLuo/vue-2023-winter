<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import { useToast } from '@/components/ui/toast/useToast';
import ProductItem from './ProductItem.vue';
import api from '@/api';
import QUERY_KEY from '@/constant/queryKey';

const queryClient = useQueryClient();
const { toast } = useToast();

const { data: products, isLoading } = useQuery({
  queryKey: [QUERY_KEY.CUSTOMER_PRODUCTS],
  queryFn: async () => (await api.customer.products.getProducts()).data.products,
});

const { mutate: addCartMutate } = useMutation({
  mutationFn: async (id: string) => await api.customer.cart.postCart(id, 1),
  onMutate: () => {
    queryClient.cancelQueries({
      queryKey: [QUERY_KEY.CARTS],
    });

    const previousCarts = queryClient.getQueryData([QUERY_KEY.CARTS]);
    return { previousCarts };
  },
  onError: (_, __, context: any) => {
    queryClient.setQueryData([QUERY_KEY.CARTS], context.previousCarts);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] });
  },
  onSuccess: (res) => {
    const title = res.data.data.product.title;

    toast({ title: title + ' 已加入購物車' });
  },
});
</script>

<template>
  <div class="vl-parent" v-if="!products">
    <Loading v-model:active="isLoading" :is-full-page="true" />
  </div>
  <ul class="flex flex-wrap gap-4 items-center" v-else>
    <li class="flex-1 max-w-72" v-for="product in products" :key="product.id">
      <ProductItem
        :id="product.id"
        :title="product.title"
        :description="product.description"
        :imagesUrl="product.imageUrl"
        :originalPrice="product.origin_price"
        :salePrice="product.price"
        @addToCart="() => addCartMutate(product.id)"
      />
    </li>
  </ul>
</template>
