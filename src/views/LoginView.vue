<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Card class="w-[350px]">
      <CardHeader class="text-center">
        <CardTitle>Login Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="account">Account</Label>
              <Input id="account" placeholder="Please input account" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
              <Input id="password" placeholder="Please input password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <Button type="button" class="w-full">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>
