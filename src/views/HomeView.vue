<script setup lang="ts">
import { h } from 'vue';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/useToast';
import { ToastAction } from '@/components/ui/toast';

const { toast } = useToast();
</script>

<template>
  <h1>Home Page</h1>
  <Button
    @click="
      () => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
          action: h(
            ToastAction,
            {
              altText: 'Try again',
              onClick: () => {
                console.log('Clicked');
              },
            },
            {
              default: () => 'Try again',
            }
          ),
        });
      }
    "
  >
    Add to calender
  </Button>
</template>
