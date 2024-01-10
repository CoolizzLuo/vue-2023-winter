<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router';

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6).max(12),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { isPending, mutateAsync } = useUserStore().useLoginMutate();

const onSubmit = handleSubmit(async (values) => {
  console.log('Form submitted!', values);
  const { email, password } = values;

  const res = await mutateAsync({
    username: email,
    password,
  });

  if (res.status === 200 && res.data.token) {
    router.push('/');
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
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button class="w-full">Login</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
