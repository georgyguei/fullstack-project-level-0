<template>
    <Center :class="cn('flex-shrink-0 flex-grow-0 rounded-full', className)" v-bind="remainingProps">
        <slot />
    </Center>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import Center, { type CenterProps } from '@/components/ui/layout/center.vue';

export type CircleProps = CenterProps;

const props = defineProps<CircleProps>();

const { class: className, ...remainingProps } = props;
</script>
