<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { PlusIcon, UploadCloudIcon } from 'lucide-vue-next';

import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/api';
import { cn } from '@/lib/utils';

const props = defineProps({
  imagesUrl: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const emits = defineEmits(['update:imagesUrl']);

const imagesUrlModel = ref([...props.imagesUrl]);
const tempFile = ref<File | null>(null);
const isLoading = ref(false);

const handleAdd = () => imagesUrlModel.value.push('');
const handleRemove = (index: number) => imagesUrlModel.value.splice(index, 1);

const handleFileChange = (event: Event) => {
  const { files } = event.target as HTMLInputElement;
  if (!files) {
    return;
  }
  const file = files[0];
  tempFile.value = file;
};

const uploadFile = async (file: File) => {
  isLoading.value = true;
  try {
    const res = await api.uploadImage(file);
    const { success, imageUrl, message } = res.data;

    if (success) {
      imagesUrlModel.value.push(imageUrl!);
    } else {
      throw new Error(message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

watch(imagesUrlModel.value, (newUrls) => {
  emits('update:imagesUrl', newUrls);
});

watch(tempFile, async (file) => {
  if (!file) {
    return;
  }
  await uploadFile(file);
  tempFile.value = null;
});
</script>

<template>
  <div ref="containerRef" class="flex flex-col gap-4 pt-4">
    <div class="space-y-2 px-2" v-for="(imageUrl, index) in imagesUrlModel" :key="index">
      <span>圖 {{ index + 1 }}</span>
      <div class="flex items-center gap-2">
        <Input type="text" v-model.lazy="imagesUrlModel[index]" placeholder="請輸入商品圖片網址" />
        <Button type="button" class="w-14" variant="destructive" size="sm" @click="handleRemove(index)">刪除</Button>
      </div>
      <div v-if="imageUrl" class="min-w-[335px] h-[250px]">
        <img
          class="rounded-md max-w-[335px] max-h-[250px] object-cover py-4"
          :src="imageUrl"
          :alt="'product-img-' + index"
        />
      </div>
    </div>
    <div v-if="isLoading" class="space-y-2 px-2">
      <span>上傳中</span>
      <div class="flex gap-2">
        <Skeleton class="w-full h-10 bg-slate-200" />
        <Skeleton class="w-14 h-10 bg-slate-200" />
      </div>
      <Skeleton class="w-64 h-48 bg-slate-200" />
    </div>
    <div class="self-center space-x-8">
      <Button type="button" variant="ghost" size="sm" @click="handleAdd">
        <PlusIcon class="w-4 h-4" />
        新增欄位
      </Button>
      <Label htmlFor="picture" :class="cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'cursor-pointer')">
        <UploadCloudIcon class="w-4 h-4" />
        上傳圖片
      </Label>
      <Input id="picture" type="file" class="hidden" @change="handleFileChange" accept=".jpg,.jpeg,.png" />
    </div>
  </div>
</template>
