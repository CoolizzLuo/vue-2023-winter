<script setup lang="ts">
import { computed, h, ref, watchEffect } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { ColumnDef } from '@tanstack/vue-table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable, TableCaption } from '@/components/ui/table';
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import ProductFormDialog from './ProductFormDialog.vue';
import api from '@/api';
import type { Product } from '@/types/products';
import QUERY_KEY from '@/constant/queryKey';

const currentPage = ref(1);
const totalPages = ref(1);
const queryClient = useQueryClient();
const { isLoading, data } = useQuery({
  queryKey: [QUERY_KEY.PRODUCTS, currentPage],
  queryFn: async () => await api.admin.getAllProducts({ page: currentPage.value }),
  // initialData: [],
});

const products = computed(() => data.value?.products ?? []);

watchEffect(() => {
  if (data.value?.pagination) {
    totalPages.value = data.value?.pagination?.total_pages;
  }
});

const { mutateAsync: deleteMutate } = useMutation({
  mutationFn: api.admin.deleteProduct,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PRODUCTS] });
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
          ConfirmDialog,
          {
            handleConfirm: () => deleteMutate(row.getValue('id')),
            title: '刪除產品',
            description: '確定要刪除此產品嗎？',
          },
          () => h(Button, { variant: 'destructive', size: 'sm' }, () => '刪除')
        ),
      ]),
  },
];
</script>

<template>
  <div class="flex justify-end">
    <ProductFormDialog>
      <Button type="button">新增產品</Button>
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
    <Pagination
      v-model:page="currentPage"
      v-slot="{ page }"
      class="flex justify-center mt-4"
      :total="totalPages * 10"
      :sibling-count="1"
      show-edges
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
      </PaginationList>
    </Pagination>
  </div>
</template>
