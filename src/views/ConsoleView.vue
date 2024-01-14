<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import type { ColumnDef } from '@tanstack/vue-table';
import ProductFormDialog from '@/components/ProductFormDialog.vue';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table';
import api from '@/api';
import type { Product } from '@/types/products';
import { h } from 'vue';

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
  },
  {
    header: '操作',
    // cell: ({ row }) => h(Button, { variant: 'secondary' }, () => row.getValue('title')),
    // cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('title')),
    cell: ({ row }) =>
      h('div', {}, [
        h(Button, { variant: 'secondary', size: 'sm' }, () => row.getValue('title')),
        h(
          Button,
          {
            size: 'sm',
            onClick: () => console.log(row.original),
          },
          () => '查看細節'
        ),
      ]),
  },
];

const { isLoading, data } = useQuery({
  queryKey: ['products'],
  queryFn: api.getAllProducts,
  initialData: [],
});
</script>

<template>
  <div>Console</div>
  <ProductFormDialog />
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
