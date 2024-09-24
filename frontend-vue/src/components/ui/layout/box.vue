<template>
  <component :is="as" :class="cn(props.class)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
export type BoxProps = {
  as?: string;
  class?: string;
}

const props = withDefaults(defineProps<BoxProps>(), {
  as: 'div',
});
</script>
