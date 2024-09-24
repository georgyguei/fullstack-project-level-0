<template>
    <Box role="group" :class="cn('relative w-full space-y-3', className)" v-bind="remainingProps">
        <slot v-bind="{ isDisabled, isInvalid, isReadOnly, isRequired }" />
    </Box>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import Box, { type BoxProps } from '@/components/ui/layout/box.vue';

export type FormControlProps = {
    isDisabled?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
};

defineSlots<{ default(props: FormControlProps): unknown; }>();

const props = defineProps<BoxProps & FormControlProps>();

const { class: className, ...remainingProps } = props;
</script>
