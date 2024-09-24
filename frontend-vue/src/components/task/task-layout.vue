<template>
    <Stack class="py-5 max-h-screen _sm:max-h-none">
        <Box class="space-y-1">
            <Heading as="h1" size="lg">Hey there, Sally</Heading>
            <Flex class="gap-3 items-center">
                <Icon name="md-factcheck-round" class="size-4" />
                <Text class="text-sm">{{ heading }}</Text>
            </Flex>
        </Box>

        <Box :class="cn('px-4', path === '/task/new' && 'space-y-3')">
            <Flex class="items-center gap-3 ">
                <CheckBox v-if="path !== '/task/new'" :defaultChecked="task.completed" size="lg" class="rounded-full"
                    @change="task.completed = $event">
                    <template #checkBoxIcon>
                        <CheckBoxIcon name="md-check" class="size-[0.625rem] transition-transform duration-normal" />
                    </template>
                </CheckBox>
                <Input :value="task.title" type="text" placeholder="Task title" size="lg"
                    :class="cn(path !== '/task/new' && 'border-0')" variant="flushed"
                    @change="task.title = $event.target.value" />
            </Flex>
            <Input :value="task.description" type="text" placeholder="Would you like to add more details?" size="sm"
                :class="cn(path !== '/task/new' && 'border-0')" variant="flushed"
                @change="task.description = $event.target.value" />
        </Box>


        <Flex class="mt-3 h-12 rounded-md items-center gap-3 hover:bg-gray-100 active:bg-gray-200 p-4">
            <Icon name="md-daterange" class="size-6" />
            <Input type="date" placeholder="Due date" size="sm" variant="flushed" :value="taskDate"
                @change="taskDate = $event.target.value" />
            <Input type="time" placeholder="Due time" size="sm" variant="flushed" :value="taskTime"
                @change="taskTime = $event.target.value" />
        </Flex>
        <Flex class=" list-none flex-wrap min-h-12 rounded-md items-center gap-3 hover:bg-gray-100 active:bg-gray-200
                    p-4">
            <Icon name="md-discount" class="size-6" />
            <Text v-for="tag in task.tags" :key="tag" as="span"
                class="font-bold text-xs min-w-10 text-center bg-blue-500 text-white rounded-md p-1">{{ tag
                }}</Text>
            <Input type="text" placeholder="Assign tags" size="sm"
                :class="cn('flex-1 min-w-[35%]', path !== '/task/new' && 'border-0')" variant="flushed" @keypress="(event) => {
                    if (event.code === 'Enter') {
                        task?.tags?.push(event.target.value);
                        event.target.value = '';
                    }
                }" />
        </Flex>
        <Button class="justify-start gap-3 hover:bg-gray-100 active:bg-gray-200 p-4" size="lg" variant="ghost"
            @click="handleDiscardTask">
            <Icon name="md-restorefromtrash" class="size-6" />
            <Text class="text-sm">Discard</Text>
        </Button>
        <Button class="self-end rounded-xl size-12 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            @click="handleSaveTask">
            <Icon name="md-download-round" class="size-6" />
        </Button>
    </Stack>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from '../ui/form/button.vue';
import Input from '../ui/form/input.vue';
import Box from '../ui/layout/box.vue';
import Flex from '../ui/layout/flex.vue';
import Icon from '../ui/media/icon.vue';
import Heading from '../ui/typography/heading.vue';
import Text from '../ui/typography/text.vue';
import type { Task } from '@/pages/index.vue';
import { cn } from '@/lib/utils';
import CheckBox from '../ui/form/check-box.vue';
import CheckBoxIcon from '../ui/form/check-box-icon.vue';
import Stack from '../ui/layout/stack.vue';

export type TaskLayoutProps = {
    task: Task;
    taskDate?: string;
    taskTime?: string;
    heading: string;
    handleSaveTask: () => void;
    handleDiscardTask: () => void;
};

const router = useRouter();

const path = router.currentRoute.value.path;

const { task, handleDiscardTask, handleSaveTask, taskDate, taskTime, heading } = defineProps<TaskLayoutProps>();


</script>