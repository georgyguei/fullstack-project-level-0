<template>
    <Flex :class="cn('relative inline-flex cursor-pointer items-center align-top',
        !slotContent || !slotContent.checkBoxIcon && 'gap-2',
        className
    )" :data-checked="isChecked" :data-disabled="isDisabled" v-bind="remainingProps">
        <input type="checkbox" class="sr-only" :checked="isChecked"
            @change="isChecked = ($event.target as any)?.checked; onChange?.(isChecked);" />
        <span :class="cn('inline-flex flex-shrink-0 select-none items-center justify-center rounded-sm border-2 border-solid align-top text-white transition-shadow duration-normal',
            size === 'sm' && 'size-3',
            size === 'md' && 'size-4',
            size === 'lg' && 'size-5',
            isChecked && 'bg-blue-500 border-blue-500'
        )" :data-checked="isChecked">
            <Center class="h-full" v-if="isChecked">
                <slot name="checkBoxIcon" />
            </Center>
        </span>
        <span :class="cn('select-none',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-md',
            size === 'lg' && 'text-lg',
        )" :data-checked="isChecked">
            <slot />
        </span>
    </Flex>
</template>



<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { cn } from '@/lib/utils';
import Flex, { type FlexProps } from '@/components/ui/layout/flex.vue';
import Center from '@/components/ui/layout/center.vue';

export type CheckBoxProps = {
    size?: 'sm' | 'md' | 'lg';
    defaultChecked?: boolean;
    isDisabled?: boolean;
    onChange?: (isChecked: boolean) => void;
} & FlexProps;

const props = withDefaults(defineProps<CheckBoxProps>(), {
    as: 'label',
    size: 'md',
});

const { class: className, size, defaultChecked, isDisabled, onChange, ...remainingProps } = props;

const slotContent = useSlots();

const isChecked = ref(defaultChecked ?? false);

</script>
