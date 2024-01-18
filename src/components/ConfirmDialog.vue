<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const props = defineProps({
  title: {
    type: String,
    default: 'Are you absolutely sure?',
  },
  description: {
    type: String,
    default:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmText: {
    type: String,
    default: 'Continue',
  },
  handleCancel: {
    type: Function,
    default: () => {},
  },
  handleConfirm: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot>
        <Button variant="outline"> Open confirm </Button>
      </slot>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ props.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="props.handleCancel">
          {{ props.cancelText }}
        </AlertDialogCancel>
        <AlertDialogAction @click="props.handleConfirm">
          {{ props.confirmText }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
