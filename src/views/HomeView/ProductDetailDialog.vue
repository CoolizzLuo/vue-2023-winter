<script setup lang="ts">
import { computed, ref } from 'vue';
import Loading from 'vue-loading-overlay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@/types/customer';
import useCart from '@/composables/useCart';

const props = defineProps<{
  isOpen: boolean;
  isLoading?: boolean;
  product?: Product | null;
}>();

const emit = defineEmits(['update:isOpen']);

const count = ref(1);
const { addCartMutation } = useCart();
const { mutateAsync: addCartMutate } = addCartMutation;

const isModalOpen = computed({
  get: () => props.isOpen,
  set: (val) => emit('update:isOpen', val),
});

const handleAddCart = async () => {
  if (props.product) {
    await addCartMutate({ id: props.product.id, count: count.value });
    isModalOpen.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogContent class="max-w-2xl min-h-96">
      <div class="vl-parent" v-if="!product">
        <Loading :active="isLoading" :is-full-page="true" />
      </div>
      <template v-else>
        <DialogHeader>
          <DialogTitle as-child>
            <h2 class="text-2xl font-bold">{{ product.title }}</h2>
          </DialogTitle>
        </DialogHeader>
        <div class="flex gap-8">
          <img :src="product.imageUrl" alt="product-img" class="rounded-md w-1/2 h-auto object-cover" />
          <div class="flex flex-col justify-between gap-12">
            <div class="flex-1 space-y-12">
              <p>內容：{{ product.content }}</p>
              <P>商品描述：{{ product.description }}</P>
              <p class="flex gap-1">
                售價：
                <span>{{ product.price }}</span>
                <span>
                  <del>{{ product.origin_price }}</del>
                </span>
                元 / {{ product.unit }}
              </p>
            </div>
            <div class="flex gap-4">
              <Input class="flex-1" min="1" type="number" v-model="count" />
              <Button class="w-28" @click="handleAddCart">加入購物車</Button>
            </div>
          </div>
        </div>
      </template>
    </DialogContent>
  </Dialog>
</template>
