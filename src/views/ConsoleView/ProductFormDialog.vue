<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { useForm } from 'vee-validate';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import ImagesUrlInput from '@/components/ImagesUrlInput.vue';
import useProductMutation from '@/composables/useProductMutation';
import { productSchema } from '@/lib/validators/productValidator';
import type { Product } from '@/types/products';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: null,
  },
});

const isModalOpen = ref(false);

const { isPending, isError, error, mutateAsync: createProductMutate } = useProductMutation(props.product?.id);
const { handleSubmit, values, setValues, setFieldValue, resetForm } = useForm({
  validationSchema: productSchema,
});

const onSubmit = handleSubmit(async (values) => {
  await createProductMutate(values);
  isModalOpen.value = false;
});

const setImagesUrl = (imagesUrl: string[]) => {
  setFieldValue('imagesUrl', imagesUrl);
};

watch(isModalOpen, () => {
  resetForm();
  if (isModalOpen.value && props.product) {
    setValues({
      ...props.product,
      is_enabled: !!props.product?.is_enabled,
    });
  }
});
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="max-w-3xl">
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea class="px-3 h-full max-h-[calc(100vh-200px)]">
          <div class="flex pt-2">
            <div class="flex flex-col flex-1 gap-4 px-2">
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
              <img
                class="rounded-md max-w-[335px] max-h-[250px] object-cover"
                alt="product-img"
                v-show="values.imageUrl"
                :src="values.imageUrl"
              />
            </div>
            <div class="flex flex-col flex-1 gap-4 px-2">
              <div class="flex justify-between gap-6">
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
              <div class="flex justify-between gap-6">
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
          </div>
          <details open class="py-4">
            <summary class="cursor-pointer select-none">新增多圖</summary>
            <ImagesUrlInput :imagesUrl="values.imagesUrl" @update:imagesUrl="setImagesUrl" />
          </details>
          <DialogFooter class="flex flex-col gap-4 justify-between py-4">
            <Button type="submit" class="w-full" :disabled="isPending" :isLoading="isPending">
              {{ product ? '更新' : '新增' }}
            </Button>
            <p v-show="isError" class="text-center text-red-400 font-bold">{{ error }}</p>
          </DialogFooter>
        </ScrollArea>
      </form>
    </DialogContent>
  </Dialog>
</template>
