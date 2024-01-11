<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api';

const { data: products } = useQuery({
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
  <h1>{Products}</h1>
  <div class="container">
    <div class="row py-3">
      <div class="col-md-6">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th width="150">產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="150">是否啟用</th>
              <th width="120">查看細節</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td width="150">{{ product.category }}</td>
              <td width="120">
                {{ product.origin_price }}
              </td>
              <td width="120">
                {{ product.price }}
              </td>
              <td width="150">
                <span v-if="product.is_enabled === 1" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td width="120">
                <button type="button" class="btn btn-primary" @click="() => selectHandler(product.id)">查看細節</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <!-- 目前有 <span>{{ products.length }}</span> 項產品 -->
        </p>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>
        <template v-if="selectedProduct">
          <div class="card mb-3">
            <img :src="selectedProduct.imageUrl" class="card-img-top primary-image" alt="主圖" />
            <div class="card-body">
              <h5 class="card-title">
                {{ selectedProduct.title }}
                <span class="badge bg-primary ms-2">{{ selectedProduct.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ selectedProduct.description }}</p>
              <p class="card-text">商品內容：{{ selectedProduct.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ selectedProduct.price }}</p>
                <p class="card-text text-secondary">
                  <del>{{ selectedProduct.origin_price }}</del>
                </p>
                元 / {{ selectedProduct.unit }}
              </div>
            </div>
          </div>
          <span v-for="imageUrl in selectedProduct.imagesUrl" :key="imageUrl">
            <img :src="imageUrl" :key="imageUrl" alt="product-img" class="images m-2 w-25" />
          </span>
        </template>
        <p v-else class="text-secondary">請選擇一個商品查看</p>
      </div>
    </div>
  </div>
</template>
