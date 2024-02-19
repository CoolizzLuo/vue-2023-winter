<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const props = defineProps<{
  id: string;
  title: string;
  description: string;
  imagesUrl: string;
  originalPrice?: number;
  salePrice: number;
  onSelected: () => void;
  onAddToCart: () => void;
}>();
</script>

<template>
  <Card class="w-72">
    <CardHeader>
      <CardTitle>{{ props.title }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-4 py-0">
      <img :src="props.imagesUrl" class="w-full h-[200px] object-cover rounded-md" />
      <p>{{ props.description }}</p>
      <div class="space-x-2">
        <span class="text-gray-500 line-through" v-if="props.originalPrice"> ${{ props.originalPrice }} </span>
        <span class="text-red-500">${{ props.salePrice }}</span>
      </div>
    </CardContent>
    <CardFooter class="py-4 flex justify-between items-center gap-4">
      <Button variant="outline" class="flex-1" @click="onSelected">查看更多</Button>
      <Button class="flex-1" @click="onAddToCart">
        <ShoppingCart class="h-5 w-5" />
      </Button>
    </CardFooter>
  </Card>
</template>
