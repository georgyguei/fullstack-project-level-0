<template>
    <Container class="ps-8 pe-8">
        <TaskLayout :task="task" :taskDate="taskDate" :taskTime="taskTime" heading="Create a new task"
            :handleSaveTask="handleAddNewTask" :handleDiscardTask="handleDiscardTask" />

    </Container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '../index.vue';
import { useRouter } from 'vue-router';
import TaskLayout from '@/components/task/task-layout.vue';
import Container from '@/components/ui/layout/container.vue';

const router = useRouter();

const task = ref<Task>({
    title: "",
    description: "",
    tags: [],
    completed: false,
});
const taskDate = ref('')
const taskTime = ref('')

const handleDiscardTask = () => {
    router.push("/");
}

const handleAddNewTask = () => {
    fetch('http://localhost:3000/task/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...task.value,
            date: taskDate.value && taskTime.value ? new Date(`${taskDate.value}T${taskTime.value}`).toISOString() : undefined,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(`Task: ${task.value.title} added successfully!`);
                console.log('before: ', task.value);
                task.value = {
                    title: "",
                    description: "",
                    tags: [],
                    completed: false,
                };
                console.log('after: ', task.value);
                taskDate.value = '';
                taskTime.value = '';
            }
        })
        .catch(error => console.error('Error:', error));
}
</script>
