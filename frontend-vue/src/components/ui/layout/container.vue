<template>
    <Box :class="cn('w-full max-w-[60ch] ps-4 pe-4 [margin-inline:auto]',
        centerContent && 'flex flex-col items-center', className)" v-bind="remainingProps">
        <slot />
    </Box>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import Box, { type BoxProps } from '@/components/ui/layout/box.vue';

export type ContainerProps = {
    centerContent?: boolean;
} & BoxProps;

const props = defineProps<ContainerProps>();

const { class: className, centerContent, ...remainingProps } = props;
</script>
