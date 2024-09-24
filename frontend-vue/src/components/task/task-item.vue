<template>
    <Stack direction="row" class="h-20 bg-gray-100 gap-5 dark:bg-whiteAlpha-200 p-5 rounded-xl cursor-pointer"
        @click="handleTaskClick">
        <CheckBox :defaultChecked="task.completed" size="lg">
            <template #checkBoxIcon>
                <CheckBoxIcon name="md-check" class="size-[0.625rem] transition-transform duration-normal" />
            </template>
        </CheckBox>
        <Stack :class="cn('gap-1', task.completed && 'opacity-65')">
            <Heading :as="task.completed ? 'del' : 'h2'" size="sm" class="no-of-lines-1">{{ title }}</Heading>
            <Text :as="task.completed ? 'del' : 'p'" v-if="date" class="text-xs">{{ formatDate(date) }}</Text>
        </Stack>
    </Stack>
</template>

<script setup lang="ts">
import type { Task } from '@/pages/index.vue';
import CheckBoxIcon from '../ui/form/check-box-icon.vue';
import CheckBox from '../ui/form/check-box.vue';
import Stack from '../ui/layout/stack.vue';
import Heading from '../ui/typography/heading.vue';
import Text from '../ui/typography/text.vue';
import { useRouter } from 'vue-router';
import { cn } from '@/lib/utils';

type TaskItemProps = {
    task: Task;
};

const { task } = defineProps<TaskItemProps>();

const { title, date } = task;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const month = date.toLocaleDateString('en-US', options).split(' ')[0].substring(0, 3);
    const day = date.toLocaleDateString('en-US', options).split(' ')[1];
    return `${month} ${day}`;
}

const router = useRouter();

const handleTaskClick = () => {
    router.push(`/task/${task.id}`);
};

</script>
