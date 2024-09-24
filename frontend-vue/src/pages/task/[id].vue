<template>
    <Container class="ps-8 pe-8">
        <Stack v-if="errorMsg === '' && task" class="py-5 max-h-screen _sm:max-h-none">
            <Box class="space-y-1">
                <Heading as="h1" size="lg">Hey there, Sally</Heading>
                <Flex class="gap-3 items-center">
                    <Icon name="md-factcheck-round" class="size-4" />
                    <Text class="text-sm">Task details</Text>
                </Flex>
            </Box>

            <Box class="px-4">
                <Flex class="items-center gap-3 ">
                    <CheckBox :defaultChecked="task.completed" size="lg" class="rounded-full"
                        @change="task.completed = $event">
                        <template #checkBoxIcon>
                            <CheckBoxIcon name="md-check"
                                class="size-[0.625rem] transition-transform duration-normal" />
                        </template>
                    </CheckBox>
                    <Input :value="task.title" type="text" placeholder="Task title" size="lg" variant="flushed"
                        @change="task.title = $event.target.value" />
                </Flex>
                <Input :value="task.description" type="text" placeholder="Would you like to add more details?" size="sm"
                    variant="flushed" @change="task.description = $event.target.value" />
            </Box>


            <Flex class="mt-3 h-12 rounded-md items-center gap-3 hover:bg-gray-100 active:bg-gray-200 p-4">
                <Icon name="md-daterange" class="size-6" />
                <Input type="date" placeholder="Due date" size="sm" variant="flushed" :value="taskDate"
                    @change="taskDate = $event.target.value" />
                <Input type="time" placeholder="Due time" size="sm" variant="flushed" :value="taskTime"
                    @change="taskTime = `${$event.target.value}:00`" />
            </Flex>
            <Flex class=" list-none flex-wrap min-h-12 rounded-md items-center gap-3 hover:bg-gray-100 active:bg-gray-200
                    p-4">
                <Icon name="md-discount" class="size-6" />
                <Text v-for="tag in task.tags" :key="tag" as="span"
                    class="font-bold text-xs min-w-10 text-center bg-blue-500 text-white rounded-md p-1">{{ tag
                    }}</Text>
                <Input type="text" placeholder="Assign tags" size="sm" class="flex-1 min-w-[35%]" variant="flushed"
                    @keypress="(event) => {
                        if (event.code === 'Enter') {
                            task?.tags?.push(event.target.value);
                            event.target.value = '';
                        }
                    }" />
            </Flex>
            <Button class="justify-start gap-3 hover:bg-gray-100 active:bg-gray-200 p-4" size="lg" variant="ghost"
                @click="handleDeleteTask">
                <Icon name="md-restorefromtrash" class="size-6" />
                <Text class="text-sm">Discard</Text>
            </Button>
            <Button class="self-end rounded-xl size-12 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                @click="handleUpdateTask">
                <Icon name="md-download-round" class="size-6" />
            </Button>
        </Stack>
        <Box v-if="errorMsg" class="h-screen">
            <AbsoluteCenter>
                <Heading class="">
                    <Text as="span" class="text-6xl text-blue-400">404.</Text> Task not found!
                </Heading>
            </AbsoluteCenter>
        </Box>
    </Container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Task } from '../index.vue';
import Container from '@/components/ui/layout/container.vue';
import Box from '@/components/ui/layout/box.vue';
import AbsoluteCenter from '@/components/ui/layout/absolute-center.vue';
import Heading from '@/components/ui/typography/heading.vue';
import Text from '@/components/ui/typography/text.vue';
import Stack from '@/components/ui/layout/stack.vue';
import Flex from '@/components/ui/layout/flex.vue';
import Icon from '@/components/ui/media/icon.vue';
import CheckBox from '@/components/ui/form/check-box.vue';
import CheckBoxIcon from '@/components/ui/form/check-box-icon.vue';
import Input from '@/components/ui/form/input.vue';
import Button from '@/components/ui/form/button.vue';

const router = useRouter();
const task = ref<Task>();
const errorMsg = ref<string | undefined>();
const taskDate = ref<string | undefined>()
const taskTime = ref<string | undefined>()
const { id: taskId } = router.currentRoute.value.params as { id: string };

const formatDatetime = (datetime: string | undefined) => {
    if (datetime) {
        taskDate.value = datetime.split('T')[0];
        taskTime.value = datetime.split('T')[1].split('.')[0];
    }
}

const handleUpdateTask = () => {
    fetch(`http://localhost:3000/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...task.value,
            date: taskDate.value ? new Date(`${taskDate.value}T${taskTime.value || '00:00:00'}`).toISOString() : undefined,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Task not updated');
            } else {
                alert(`Task: ${task.value?.title} updated successfully!`);
            }
        })
        .catch(error => console.error('Error:', error));
}

const handleDeleteTask = () => {
    fetch(`http://localhost:3000/task/delete/${taskId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Task not deleted');
                return;
            }
            alert('Task deleted');
            router.push("/");
        })
}

fetch(`http://localhost:3000/task/${taskId}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorMsg.value = data.error;
            return;
        }
        task.value = (data as Task)
        formatDatetime(task.value.date)
        errorMsg.value = ''
        console.log(task.value)
    })
    .catch(error => {
        console.error('Error:', error);
    });

</script>
