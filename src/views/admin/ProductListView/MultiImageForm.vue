<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { PlusIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ImageUrlInput from '@/components/ImageUrlInput.vue';

const props = defineProps({
  imagesUrl: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const emits = defineEmits(['update:imagesUrl']);

const imagesUrlModel = ref([...props.imagesUrl]);
const isLoading = ref(false);

const handleAdd = () => imagesUrlModel.value.push('');
const handleRemove = (index: number) => imagesUrlModel.value.splice(index, 1);

watch(imagesUrlModel.value, (newUrls) => emits('update:imagesUrl', newUrls));
</script>

<template>
  <div ref="containerRef" class="flex flex-col gap-4 pt-4">
    <div class="space-y-2 px-2" v-for="(imageUrl, index) in imagesUrlModel" :key="index">
      <span>圖 {{ index + 1 }}</span>
      <ImageUrlInput v-model:url="imagesUrlModel[index]" @remove="handleRemove(index)" />
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
        <Skeleton class="w-10 h-10 bg-slate-200" />
        <Skeleton class="w-10 h-10 bg-slate-200" />
      </div>
      <Skeleton class="w-64 h-48 bg-slate-200" />
    </div>
    <div class="self-center space-x-8">
      <Button type="button" variant="ghost" size="sm" @click="handleAdd">
        <PlusIcon class="w-4 h-4" />
        新增欄位
      </Button>
    </div>
  </div>
</template>
