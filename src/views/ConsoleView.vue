<script setup lang="ts">
import { computed, h, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { ColumnDef } from '@tanstack/vue-table';
import ProductFormDialog from '@/components/ProductFormDialog.vue';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table';
import api from '@/api';
import type { Product } from '@/types/products';

const { isLoading, data } = useQuery({
  queryKey: ['products'],
  queryFn: api.getAllProducts,
  initialData: [],
});
const editingId = ref<string | null>(null);
const editingProduct = computed(() => data.value.find((product) => product.id === editingId.value));

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
    accessorKey: 'id',
    header: '操作',
    // cell: ({ row }) => h(Button, { variant: 'secondary' }, () => row.getValue('title')),
    // cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('title')),
    cell: ({ row }) =>
      h('div', {}, [
        h(Button, { size: 'sm', onClick: () => (editingId.value = row.getValue('id')) }, () => '編輯'),
        h(
          Button,
          {
            variant: 'secondary',
            size: 'sm',
            onClick: () => console.log(row.original),
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
      <Button type="button"> Create Product </Button>
    </ProductFormDialog>
    <ProductFormDialog :product="editingProduct">
      <Button type="button"> Edit Product </Button>
    </ProductFormDialog>
  </div>
  <div class="py-6">
    <DataTable :columns="columns" :data="data" />
  </div>
  {{ editingId }}
  {{ editingProduct }}
</template>
