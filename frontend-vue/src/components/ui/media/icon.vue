<template>
    <v-icon :class="cn('inline-block shrink-0 align-middle text-current leading-[1em]', className)"
        v-bind="remainingProps" />
</template>

<script setup lang="ts">
import type { IconType } from 'oh-vue-icons/types/icons';
import { cn } from '../../../lib/utils';
import type { BoxProps } from '@/components/ui/layout/box.vue';

export type IconProps = Omit<BoxProps, 'as'> & Pick<IconType, 'name'>;

const props = defineProps<IconProps>();

const { class: className, ...remainingProps } = props;
</script>