<template>
    <Text :class="cn(isRequired ? 'flex justify-start gap-1' : 'block text-start',
        'font-medium text-md transition-common duration-normal',
        isDisabled && 'data-[disabled=\'true\']:opacity-40', className)" :data-disabled="isDisabled"
        :data-invalid="isInvalid" :data-readonly="isReadOnly" v-bind="remainingProps">
        <span v-if="isRequired" :class="cn('text-red-500', className)" role="presentation" :aria-hidden="true">*</span>
        <slot />
    </Text>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import Text, { type TextProps } from '@/components/ui/typography/text.vue';
import type { FormControlProps } from '@/components/ui/form/form-control.vue';

export type FormLabelProps = TextProps & FormControlProps;

const props = withDefaults(defineProps<FormLabelProps>(), {
    as: 'label',
});

const { class: className, isDisabled, isRequired, ...remainingProps } = props;
</script>
