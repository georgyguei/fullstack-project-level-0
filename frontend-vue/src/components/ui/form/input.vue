<template>
    <Box :class="cn(
        isDisabled && 'disabled:cursor-not-allowed disabled:opacity-40',
        isInvalid && 'aria-[invalid=\'true\']:border-red-500',
        isReadOnly && 'read-only:select-all read-only:shadow-none',
        inputVariant({ variant, size }),
        className)" :disabled="isDisabled" :aria-invalid="isInvalid || undefined" :read-only="isReadOnly"
        :required="isRequired" :aria-required="isRequired || undefined" v-bind="remainingProps">
        <slot />
    </Box>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Box, { type BoxProps } from '@/components/ui/layout/box.vue';

/**
 * The variant of the input component
 */
const inputVariant = cva(
    'relative w-full min-w-0 appearance-none border-solid outline-none transition-common duration-normal placeholder:opacity-80',
    {
        variants: {
            size: {
                xs: 'h-6 rounded-sm ps-2 pe-2 text-xs',
                sm: 'h-8 rounded-sm ps-3 pe-3 text-sm',
                md: 'h-10 rounded-md ps-4 pe-4 text-md',
                lg: 'h-12 rounded-md ps-4 pe-4 text-lg',
            },
            variant: {
                outline:
                    'border hover:border-gray-300 focus-visible:z-[1] focus-visible:border-2 focus-visible:border-blue-500',
                filled:
                    'border-2 border-transparent bg-gray-100 hover:bg-gray-200 focus-visible:border-blue-500 focus-visible:bg-transparent',
                flushed:
                    'rounded-none border-b bg-transparent ps-0 pe-0 focus-visible:border-blue-500 focus-visible:border-b-2',
                unstyled: 'h-auto bg-transparent ps-0 pe-0',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'outline',
        },
    }
);

export type InputProps = {
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    size?: NonNullable<Parameters<typeof inputVariant>[0]>['size'],
    variant?: NonNullable<Parameters<typeof inputVariant>[0]>['variant']
} & BoxProps;

const props = withDefaults(defineProps<InputProps>(), {
    as: 'input',
});

const { class: className, size, variant, isDisabled, isInvalid, isReadOnly, isRequired, ...remainingProps } = props;
</script>
