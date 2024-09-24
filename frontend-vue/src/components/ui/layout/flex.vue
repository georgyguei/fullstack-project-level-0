<template>
    <Box :class="cn('flex', className)" v-bind="remainingProps">
        <slot />
    </Box>
</template>

<script setup lang="ts">
import { cn } from '../../../lib/utils';
import Box, { type BoxProps } from './box.vue';

export type FlexProps = BoxProps;

const props = defineProps<FlexProps>();

const { class: className, ...remainingProps } = props;
</script>
