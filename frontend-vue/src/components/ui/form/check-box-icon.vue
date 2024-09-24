<template>
    <Icon :class="cn('flex', className)" v-bind="remainingProps" />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import Icon, { type IconProps } from '@/components/ui/media/icon.vue';

export type CheckBoxIconProps = IconProps;

const props = defineProps<CheckBoxIconProps>();

const { class: className, ...remainingProps } = props;
</script>
