<script setup lang="ts">
import { computed, ref } from 'vue';
import { ShoppingCart, Trash, Trash2, Minus, Plus } from 'lucide-vue-next';
import { useMutation, useQuery, useQueryClient, useIsMutating } from '@tanstack/vue-query';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import api from '@/api';
import QUERY_KEY from '@/constant/queryKey';
import { cn } from '@/lib/utils';

const queryClient = useQueryClient();
const isMutating = useIsMutating();

const isOpen = ref(false);
const { data } = useQuery({
  queryKey: [QUERY_KEY.CARTS],
  queryFn: async () => (await api.customer.cart.getCarts()).data.data,
});

const cartItemCount = computed(() => {
  return data.value?.carts.length ?? 0;
});

const { mutate: updateCart } = useMutation({
  mutationFn: ({ cartId, productId, qty }: { cartId: string; productId: string; qty: number }) =>
    api.customer.cart.updateCart(cartId, productId, qty),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] }),
});

const { mutate: removeCart } = useMutation({
  mutationFn: api.customer.cart.deleteCart,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] }),
});

const { mutate: removeAllCarts } = useMutation({
  mutationFn: api.customer.cart.deleteAllCarts,
  onMutate: async () => {
    await queryClient.cancelQueries({ queryKey: [QUERY_KEY.CARTS] });

    const previousData = queryClient.getQueryData([QUERY_KEY.CARTS]);

    queryClient.setQueryData([QUERY_KEY.CARTS], { carts: [] });

    return { previousData };
  },
  onError: (err, _, context) => {
    if (context?.previousData) {
      queryClient.setQueryData([QUERY_KEY.CARTS], context.previousData);
    }
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] }),
});
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="relative">
        <ShoppingCart class="h-5 w-5" />
        <span
          class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
        >
          {{ cartItemCount }}
        </span>
      </Button>
    </SheetTrigger>
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle class="text-center"> Shopping cart </SheetTitle>
      </SheetHeader>
      <template v-if="cartItemCount !== 0">
        <ScrollArea class="px-3 max-h-[calc(100vh-240px)]">
          <ul class="space-y-4 py-4">
            <li v-for="cart in data?.carts" :key="cart.id" class="space-y-2">
              <div class="flex gap-4">
                <img :src="cart.product.imageUrl" :alt="cart.product.title" class="w-20 h-16 rounded-md" />
                <div class="flex flex-col justify-between flex-1">
                  <h3>{{ cart.product.title }}</h3>
                  <div class="flex justify-between items-center">
                    <span class="text-sm">$ {{ cart.product.price.toLocaleString() }}</span>
                    <div class="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        class="h-8 w-8 shrink-0 rounded-full"
                        :disabled="isMutating || cart.qty <= 1"
                        @click="() => updateCart({ cartId: cart.id, productId: cart.product_id, qty: cart.qty - 1 })"
                      >
                        <Minus class="h-4 w-4" />
                        <span class="sr-only">Decrease</span>
                      </Button>
                      <span class="font-bold tracking-tighter min-w-4 text-right">
                        {{ cart.qty }}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        class="h-8 w-8 shrink-0 rounded-full"
                        :disabled="isMutating"
                        @click="() => updateCart({ cartId: cart.id, productId: cart.product_id, qty: cart.qty + 1 })"
                      >
                        <Plus class="h-4 w-4" />
                        <span class="sr-only">Increase</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        class="h-6 w-6 ml-2 shrink-0 rounded-full"
                        :disabled="isMutating"
                        @click="() => removeCart(cart.id)"
                      >
                        <Trash2 class="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-sm">小計 $ {{ cart.total.toLocaleString() }}</p>
              <Separator />
            </li>
          </ul>
        </ScrollArea>
        <div class="space-y-2 text-sm font-semibold">
          <div class="flex justify-between">
            <span>共有 {{ cartItemCount }} 件商品</span>
            <span>總金額 NT$ {{ (data?.final_total ?? 0).toLocaleString() }}</span>
          </div>
        </div>
        <SheetFooter>
          <Button class="w-full" type="button" :disabled="isMutating">
            <ShoppingCart class="h-4 w-4 mr-2" />
            訂單結帳
          </Button>
          <Button
            :class="
              cn('w-full', {
                'opacity-50 cursor-not-allowed': isMutating || cartItemCount <= 0,
              })
            "
            type="button"
            variant="secondary"
            :disabled="isMutating || cartItemCount <= 0"
            @click="removeAllCarts"
          >
            <Trash class="h-4 w-4 mr-2" />
            清空購物車
          </Button>
        </SheetFooter>
      </template>
      <div class="flex items-center justify-center h-72" v-else>
        <p class="text-lg font-semibold text-primary">購物車是空的</p>
      </div>
    </SheetContent>
  </Sheet>
</template>
