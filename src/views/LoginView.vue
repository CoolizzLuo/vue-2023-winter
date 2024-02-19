<script setup lang="ts">
import { useForm } from 'vee-validate';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router';
import { formSchema } from '@/lib/validators/loginValidator';

const userStore = useUserStore();
const { isPending, isError, error, mutateAsync: loginMutate } = userStore.useLoginMutation();

const { handleSubmit } = useForm({ validationSchema: formSchema });

const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values;
  const res = await loginMutate({
    username: email,
    password,
  });

  if (res.status === 200 && res.data.token) {
    router.push('/admin');
  }
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Card class="w-[350px]">
      <form @submit="onSubmit">
        <CardHeader class="text-center">
          <CardTitle>Login Form</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Please input email" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Please input Password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex flex-col gap-4 justify-between px-6 pb-4">
          <Button class="w-full" :disabled="isPending" :isLoading="isPending">
            <span> Login </span>
          </Button>
          <p v-show="isError" class="text-center text-red-400 font-bold">{{ error }}</p>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
