<script setup lang="ts">
import { computed, h } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { ColumnDef } from '@tanstack/vue-table';
import ProductFormDialog from '@/components/ProductFormDialog.vue';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable, TableCaption } from '@/components/ui/table';
import api from '@/api';
import type { Product } from '@/types/products';

const queryClient = useQueryClient();
const { isLoading, data } = useQuery({
  queryKey: ['products'],
  queryFn: api.getAllProducts,
  // initialData: [],
});

const products = computed(() => data.value ?? []);

const { mutateAsync: deleteMutate } = useMutation({
  mutationFn: api.deleteProduct,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'category',
    header: '分類',
  },
  {
    accessorKey: 'title',
    header: '產品名稱',
  },
  {
    accessorKey: 'origin_price',
    header: '原價',
  },
  {
    accessorKey: 'price',
    header: '售價',
  },
  {
    accessorKey: 'is_enabled',
    header: '是否啟用',
    cell: ({ row }) => h(Switch, { disabled: true, checked: !!row.getValue('is_enabled') }),
  },
  {
    accessorKey: 'id',
    header: '操作',

    cell: ({ row }) =>
      h('div', { class: 'space-x-2' }, [
        h(
          ProductFormDialog,
          {
            product: products.value.find((product) => product.id === row.getValue('id')),
          },
          () => h(Button, { variant: 'secondary', size: 'sm' }, () => '編輯')
        ),
        h(
          Button,
          {
            variant: 'destructive',
            size: 'sm',
            // isLoading: isPending.value,
            onClick: () => deleteMutate(row.getValue('id')),
          },
          () => '刪除'
        ),
      ]),
  },
];
</script>

<template>
  <div>Console</div>
  <div class="flex justify-end">
    <ProductFormDialog>
      <Button type="button">Create Product</Button>
    </ProductFormDialog>
  </div>
  <div class="py-6">
    <DataTable :columns="columns" :data="products" :isLoading="isLoading">
      <template #caption>
        <TableCaption v-show="products?.length">
          目前有 <span>{{ products?.length }}</span> 項產品
        </TableCaption>
      </template>
    </DataTable>
  </div>
</template>
