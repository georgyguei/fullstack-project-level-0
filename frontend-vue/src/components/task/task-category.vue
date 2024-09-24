<template>
    <Flex class="flex-col gap-2 items-center">
        <Center class="size-14 rounded-xl bg-gray-100 dark:bg-whiteAlpha-200">
            <Icon :name="icon" />
        </Center>
        <Text class="text-sm">{{ title }}</Text>
    </Flex>
</template>

<script setup lang="ts">
import Center from '../ui/layout/center.vue';
import Flex from '../ui/layout/flex.vue';
import Icon from '../ui/media/icon.vue';
import Text from '../ui/typography/text.vue';



type TaskCategoryProps = {
    title: string;
    icon: string;
};

const props = defineProps<TaskCategoryProps>();

const { title, icon } = props;
</script>