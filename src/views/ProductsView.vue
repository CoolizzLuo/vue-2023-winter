<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ProductView from '@/views/ProductView.vue';

const { isFetching, data: products } = useQuery({
  queryKey: ['products'],
  queryFn: api.getAllProducts,
});

const selectedProductId = ref<string | null>(null);

const selectedProduct = computed(() => {
  if (!selectedProductId.value) {
    return null;
  }
  return products.value?.find(({ id }) => id === selectedProductId.value);
});

const selectHandler = (id: string) => (selectedProductId.value = id);
</script>

<template>
  <div class="row py-3">
    <Table>
      <TableCaption v-show="products?.length">
        目前有 <span>{{ products?.length }}</span> 項產品
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> 產品名稱 </TableHead>
          <TableHead>原價</TableHead>
          <TableHead>售價</TableHead>
          <TableHead>是否啟用</TableHead>
          <TableHead class="text-right"> 查看細節 </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in products" :key="product.id">
          <TableCell class="font-medium"> {{ product.category }} </TableCell>
          <TableCell>{{ product.origin_price }}</TableCell>
          <TableCell>{{ product.price }}</TableCell>
          <TableCell>
            <span v-if="product.is_enabled === 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </TableCell>
          <TableCell class="text-right">
            <Button type="button" @click="() => selectHandler(product.id)">查看細節</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <ProductView v-if="selectedProduct" :product="selectedProduct" />
  </div>
</template>
