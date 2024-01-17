<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { PlusIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const props = defineProps({
  imagesUrl: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const emits = defineEmits(['update:imagesUrl']);

const imagesUrlModel = ref([...props.imagesUrl]);

const addImageUrl = () => imagesUrlModel.value.push('');
const removeImageUrl = (index: number) => imagesUrlModel.value.splice(index, 1);

watch(imagesUrlModel.value, (newUrls) => {
  emits('update:imagesUrl', newUrls);
});
</script>

<template>
  <div ref="containerRef" class="flex flex-col gap-4 pt-4">
    <div class="space-y-2" v-for="(imageUrl, index) in imagesUrlModel" :key="index">
      <span>圖 {{ index + 1 }}</span>
      <div v-if="imageUrl" class="min-w-[335px] h-[250px]">
        <img
          class="rounded-md max-w-[335px] max-h-[250px] object-cover py-4"
          :src="imageUrl"
          :alt="'product-img-' + index"
        />
      </div>
      <div class="flex gap-2 px-2">
        <Input type="text" v-model.lazy="imagesUrlModel[index]" placeholder="請輸入商品圖片網址" />
        <Button type="button" class="w-14" variant="destructive" size="sm" @click="removeImageUrl(index)">
          刪除
        </Button>
      </div>
    </div>
    <Button class="w-32 self-center" type="button" variant="ghost" size="sm" @click="addImageUrl">
      <PlusIcon class="w-4 h-4" />
      新增欄位
    </Button>
  </div>
</template>
