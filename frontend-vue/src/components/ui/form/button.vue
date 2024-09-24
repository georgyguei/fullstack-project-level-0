<template>
    <Box type="button" :class="cn(buttonVariants({ size, variant }), className)" v-bind="remainingProps">
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
const buttonVariants = cva(
    'relative inline select-none appearance-none whitespace-nowrap rounded-md align-middle font-semibold outline-none transition-common duration-normal focus-visible:shadow-outline',
    {
        variants: {
            size: {
                lg: 'h-12 min-w-12 ps-6 pe-6 text-lg',
                md: 'h-10 min-w-10 ps-4 pe-4 text-md leading-[1.2]',
                sm: 'h-8 min-w-8 ps-3 pe-3 text-sm',
                xs: 'h-6 min-w-6 ps-2 pe-2 text-xs',
            },
            variant: {
                ghost:
                    'inline-flex items-center justify-center text-gray-700 hover:bg-gray-100 active:bg-gray-200',
                outline:
                    'inline-flex items-center justify-center border border-gray-200 border-solid text-gray-700 hover:bg-gray-100 active:bg-gray-200',
                solid:
                    'inline-flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300',
                link: 'inline-flex items-center justify-center text-gray-500 hover:underline active:text-gray-700',
                unstyled: 'm-0 p-0 text-inherit leading-[inherit] [background:none]',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'solid',
        },
    }
);

export type ButtonProps = {
    size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size'],
    variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
} & BoxProps;

const props = withDefaults(defineProps<ButtonProps>(), {
    as: 'button',
});

const { class: className, size, variant, ...remainingProps } = props;
</script>
