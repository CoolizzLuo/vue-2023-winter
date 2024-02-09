<script setup lang="ts">
import type { Product } from '@/types/customer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const { product } = defineProps<{
  product: Product;
}>();
</script>

<template>
  <section>
    <div class="flex gap-4">
      <img :src="product.imageUrl" class="w-1/2" alt="product" />
      <div class="w-1/2">
        <h2>{{ product.title }}</h2>
        <div class="py-12">
          <span>{{ product.category }}</span>
          <p>商品描述：{{ product.description }}</p>
          <p>商品內容：{{ product.content }}</p>
        </div>
        <div class="flex gap-1">
          <p>{{ product.price }}</p>
          <p>
            <del>{{ product.origin_price }}</del>
          </p>
          元 / {{ product.unit }}
        </div>
      </div>
    </div>
    <div class="mx-auto" v-if="product.imagesUrl?.length">
      <Carousel class="w-full">
        <CarouselContent>
          <CarouselItem v-for="imageUrl in product.imagesUrl" :key="imageUrl">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <img :src="imageUrl" alt="small-pic" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
</template>
