<script setup lang="ts">
import { ref } from 'vue';
import Loading from 'vue-loading-overlay';
import { useQuery } from '@tanstack/vue-query';
import ProductItem from './ProductItem.vue';
import api from '@/api';
import QUERY_KEY from '@/constant/queryKey';
import ProductDetailDialog from './ProductDetailDialog.vue';
import useProductQuery from '@/composables/useProductQuery';
import useCart from '@/composables/useCart';

const isOpenDetailDialog = ref(false);
const selectedProductId = ref<string | null>(null);

const { data: products, isLoading } = useQuery({
  queryKey: [QUERY_KEY.CUSTOMER_PRODUCTS],
  queryFn: async () => (await api.customer.products.getProducts()).data.products,
});

const { data: selectedProduct, isLoading: isProductDetailLoading } = useProductQuery(selectedProductId);

const { addCartMutation } = useCart();
const { mutate: addCartMutate } = addCartMutation;

const handleSelected = (id: string) => {
  selectedProductId.value = id;
  isOpenDetailDialog.value = true;
};
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
        @selected="() => handleSelected(product.id)"
        @addToCart="() => addCartMutate({ id: product.id, count: 1 })"
      />
    </li>
  </ul>
  <ProductDetailDialog
    v-model:isOpen="isOpenDetailDialog"
    :isLoading="isProductDetailLoading"
    :product="selectedProduct"
  />
</template>
