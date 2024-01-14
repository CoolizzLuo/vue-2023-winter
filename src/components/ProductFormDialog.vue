<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { productSchema } from '@/lib/validators/productValidator';
import api from '@/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Product } from '@/types/products';

const props = defineProps<{ product?: Product }>();

const isModalOpen = ref(false);
const {
  isPending,
  isError,
  error,
  mutateAsync: createProductMutate,
} = useMutation({
  mutationFn: api.createProduct,
});

const { handleSubmit, values } = useForm({
  initialValues: {
    ...props.product,
    is_enabled: !!props.product?.is_enabled,
  },
  validationSchema: productSchema,
});

const onSubmit = handleSubmit(async (values) => {
  await createProductMutate(values);
  isModalOpen.value = false;
});
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogTrigger as-child>
      <Button type="button" variant="outline"> Create Product </Button>
    </DialogTrigger>
    <DialogContent>
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div class="flex flex-col gap-4 px-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>標題</FormLabel>
              <FormControl>
                <Input type="text" placeholder="請輸入商品名稱" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="imageUrl">
            <FormItem>
              <FormLabel>主要圖片</FormLabel>
              <FormControl>
                <Input type="text" placeholder="請輸入商品圖片網址" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <img class="rounded-md" :src="values.imageUrl" alt="Pic" />
          <div class="flex justify-between">
            <FormField v-slot="{ componentField }" name="category">
              <FormItem>
                <FormLabel>分類</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="請選擇商品分類" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="unit">
              <FormItem>
                <FormLabel>單位</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="請輸入商品單位" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ componentField }" name="content">
            <FormItem>
              <FormLabel>產品描述</FormLabel>
              <FormControl>
                <Input type="text" placeholder="請輸入商品描述" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>說明內容</FormLabel>
              <FormControl>
                <Input type="text" placeholder="請輸入商品說明" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="flex justify-between">
            <FormField v-slot="{ componentField }" name="origin_price">
              <FormItem>
                <FormLabel>原始價格</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入商品原價" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="price">
              <FormItem>
                <FormLabel>價格</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="請輸入商品售價" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <FormField v-slot="{ value, handleChange }" name="is_enabled">
            <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> 是否啟用 </FormLabel>
                <FormDescription class="text-sm"> 啟用後，該商品將會顯示在前台 </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <DialogFooter class="flex flex-col gap-4 justify-between py-4">
          <Button type="submit" class="w-full" :disabled="isPending" :isLoading="isPending"> 新增 </Button>
          <p v-show="isError" class="text-center text-red-400 font-bold">{{ error }}</p>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
