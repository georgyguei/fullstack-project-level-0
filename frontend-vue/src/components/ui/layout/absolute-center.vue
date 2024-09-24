<template>
    <Box :class="cn(absoluteCenterVariants({ axis }), className)" v-bind="remainingProps">
        <slot />
    </Box>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Box, { type BoxProps } from '@/components/ui/layout/box.vue';

/**
 * Configures variants for absolute centering using `cva`, setting 'absolute' as the base class.
 * Allows for specifying the axis of centering with default to 'both' for full centering.
 */
const absoluteCenterVariants = cva('absolute', {
    variants: {
        axis: {
            horizontal: '-translate-x-1/2 left-1/2',
            vertical: '-translate-y-1/2 top-1/2',
            both: '-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
        },
    },
    defaultVariants: {
        axis: 'both',
    },
});

export type AbsoluteCenterProps = {
    axis?: NonNullable<Parameters<typeof absoluteCenterVariants>[0]>['axis']
} & BoxProps;

const props = defineProps<AbsoluteCenterProps>();

const { class: className, axis, ...remainingProps } = props;
</script>
