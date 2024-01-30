<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import { UploadCloudIcon, Trash2Icon } from 'lucide-vue-next';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import api from '@/api';

const props = defineProps({
  url: {
    type: String as PropType<string>,
    default: '',
  },
});

const emits = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:url': (value: string) => true,
  remove: () => true,
});

const isLoading = ref(false);

const urlModel = computed({
  get: () => props.url,
  set: (value) => emits('update:url', value),
});

const handleFileChange = async (event: Event) => {
  const { files } = event.target as HTMLInputElement;

  if (!files) {
    return;
  }

  const file = files[0];
  try {
    isLoading.value = true;
    const res = await api.admin.uploadImage(file);

    const { success, imageUrl, message } = res.data;
    if (success) {
      emits('update:url', imageUrl!);
    } else {
      throw new Error(message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleRemove = () => emits('remove');
</script>

<template>
  <div class="flex gap-2">
    <Input type="text" v-model="urlModel" placeholder="請輸入商品圖片網址或上傳圖片" />
    <Label :class="cn(buttonVariants({ size: 'sm' }), 'h-10 space-x-2 cursor-pointer')">
      <span
        v-if="isLoading"
        class="w-4 h-4 rounded-full animate-spin border-2 border-solid border-blue-300 border-t-transparent"
      />
      <UploadCloudIcon v-else class="w-4 h-4" />
      <Input type="file" class="hidden" @change="handleFileChange" accept=".jpg,.jpeg,.png" />
    </Label>
    <Button type="button" class="h-10" variant="destructive" size="sm" :isLoading="isLoading" @click="handleRemove">
      <Trash2Icon class="w-4 h-4" />
    </Button>
  </div>
</template>
