<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { useQueryClient, useMutation } from '@tanstack/vue-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast/useToast';
import { formSchema } from '@/lib/validators/orderValidator';
import api from '@/api';
import QUERY_KEY from '@/constant/queryKey';

const isOpen = ref(false);

const queryClient = useQueryClient();
const {
  mutateAsync: createOrder,
  isPending,
  isError,
  error,
} = useMutation({
  mutationFn: api.customer.order.createOrder,
  onSuccess: (res) => {
    if (res?.data?.success) {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CARTS] });
      useToast().toast({
        title: res.data.message ?? '已建立訂單',
        duration: 2000,
      });
    } else {
      throw new Error('Failed to create order');
    }
  },
});

const { handleSubmit } = useForm({ validationSchema: formSchema });

const onSubmit = handleSubmit(async (values) => {
  const { email, name, phone, address, message = '' } = values;
  const res = await createOrder({
    user: {
      email,
      name,
      tel: phone,
      address,
    },
    message,
  });

  if (res?.data?.success) {
    isOpen.value = false;
  }
});
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger">
        <Button class="w-full">
          <span> 送出訂單 </span>
        </Button>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>訂購資料</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4 py-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <div class="flex justify-between items-center">
                <FormLabel class="font-bold">Email</FormLabel>
                <FormMessage class="text-xs" />
              </div>
              <FormControl>
                <Input type="text" placeholder="Please input email" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <div class="flex justify-between items-center">
                <FormLabel class="font-bold">收件人姓名</FormLabel>
                <FormMessage class="text-xs" />
              </div>
              <FormControl>
                <Input type="text" placeholder="Please input name" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="phone">
            <FormItem>
              <div class="flex justify-between items-center">
                <FormLabel class="font-bold">收件人電話</FormLabel>
                <FormMessage class="text-xs" />
              </div>
              <FormControl>
                <Input type="text" placeholder="Please input phone" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="address">
            <FormItem>
              <div class="flex justify-between items-center">
                <FormLabel class="font-bold">收件人地址</FormLabel>
                <FormMessage class="text-xs" />
              </div>
              <FormControl>
                <Input type="text" placeholder="Please input address" v-bind="componentField" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="message">
            <FormItem>
              <div class="flex justify-between items-center">
                <FormLabel class="font-bold">備註</FormLabel>
                <FormMessage class="text-xs" />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  class="resize-none"
                  v-bind="componentField"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div class="flex flex-col gap-4">
          <Button class="w-full drop-shadow-md" type="submit" :disabled="isPending" :isLoading="isPending">
            <span> 送出訂單 </span>
          </Button>
          <p v-show="isError" class="text-center text-xs text-red-400 font-bold">{{ error }}</p>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
