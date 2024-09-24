<template>
    <Flex :class="cn(stackVariants({ direction }), className)" v-bind:="remainingProps">
        <slot />
    </Flex>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Flex, { type FlexProps } from '@/components/ui/layout/flex.vue';

/**
 * Configures variants for the Stack component, allowing for customizable direction and spacing.
 */
const stackVariants = cva('gap-2', {
    variants: {
        direction: {
            column: 'flex-col',
            row: 'flex-row',
        },
    },
    defaultVariants: {
        direction: 'column',
    },
});

export type StackProps = {
    direction?: NonNullable<Parameters<typeof stackVariants>[0]>['direction']
} & FlexProps;

const props = defineProps<StackProps>();

const { class: className, direction, ...remainingProps } = props;
</script>
