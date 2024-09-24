<template>
    <Flex :class="cn('items-center justify-center', className)" v-bind="remainingProps">
        <slot />
    </Flex>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import Flex, { type FlexProps } from '@/components/ui/layout/flex.vue';

export type CenterProps = FlexProps;

const props = defineProps<FlexProps>();

const { class: className, ...remainingProps } = props;
</script>
