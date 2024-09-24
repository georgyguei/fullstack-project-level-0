<template>
    <Text :class="cn(headingVariants({ size }), $attrs.class ?? '')" v-bind="remainingProps">
        <slot />
    </Text>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import Text, { type TextProps } from '@/components/ui/typography/text.vue';
import { cn } from '@/lib/utils';

/**
 * The heading size.
 */
const headingVariants = cva('font-bold font-heading', {
    variants: {
        size: {
            '4xl': 'text-6xl leading-none',
            '3xl': 'text-5xl leading-none',
            '2xl': 'text-4xl leading-[1.2]',
            xl: 'text-3xl leading-[1.33]',
            lg: 'text-2xl leading-[1.33]',
            md: 'text-xl leading-[1.2]',
            sm: 'text-md leading-[1.2]',
            xs: 'text-sm leading-[1.2]',
        },
    },
    defaultVariants: {
        size: 'xl',
    },
});

export type HeadingProps = {
    size?: NonNullable<Parameters<typeof headingVariants>[0]>['size']
} & TextProps;

const props = withDefaults(defineProps<HeadingProps>(), {
    as: 'h2',
});

const { size, ...remainingProps } = props;
</script>
