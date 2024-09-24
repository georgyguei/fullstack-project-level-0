<template>
    <Box :class="cn(textVariants({ variant }), $attrs.class ?? '')" v-bind="remainingProps">
        <slot />
    </Box>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Box, { type BoxProps } from '@/components/ui/layout/box.vue';

/**
 * The text variants.
 */
const textVariants = cva('', {
    variants: {
        variant: {
            contrast:
                'text-inherit opacity-95 mix-blend-luminosity brightness-[1.5] contrast-[9000] grayscale-[1] invert-[1] [filter:var(--tw-invert)_var(--tw-grayscale)_var(--tw-brightness)_var(--tw-contrast)]',
        },
    },
});

export type TextProps = {
    variant?: NonNullable<Parameters<typeof textVariants>[0]>['variant'];
} & BoxProps;

const props = withDefaults(defineProps<TextProps>(), {
    as: 'p',
});

const { variant, ...remainingProps } = props;
</script>
