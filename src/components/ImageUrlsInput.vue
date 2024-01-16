<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const props = defineProps<{ imageUrls?: string[]; setImagesUrl?: (value: string[]) => void }>();
const imageUrls = ref(props.imageUrls || []);
const emits = defineEmits(['update:imageUrls']);

watch(imageUrls, (newUrls) => {
  // emits('update:imageUrls', newUrls);
  // props.setImagesUrl?.(newUrls);

  console.log('imageUrls', newUrls);
});

const removeImageUrl = (index: number) => {
  imageUrls.value.splice(index, 1);
};

const addImageUrl = () => {
  imageUrls.value.push('');
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="space-y-4" v-for="(imageUrl, index) in imageUrls" :key="index">
      <img class="rounded-md min-h-4 max-w-[335px] max-h-[250px] object-cover py-4" :src="imageUrl" alt="product-img" />
      <div class="flex gap-2 px-2">
        <Input type="text" v-model="imageUrls[index]" placeholder="請輸入商品圖片網址" />
        <Button type="button" class="w-14" variant="destructive" size="sm" @click="removeImageUrl(index)">
          刪除
        </Button>
      </div>
    </div>
    <Button type="button" size="sm" @click="addImageUrl"> 新增欄位 </Button>
  </div>
</template>
