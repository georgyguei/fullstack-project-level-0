<template>
  <Container class="ps-8 pe-8">
    <Stack class="gap-8 py-5 max-h-screen _sm:max-h-none">
      <Box class="space-y-1">
        <Heading as="h1" size="lg">Hey there, Sally</Heading>
        <Text class="text-sm">Organize your plants for the day</Text>
      </Box>
      <Box class="space-y-5">
        <Heading size="sm">Categories</Heading>
        <Stack direction="row" class="gap-8 overflow-auto">
          <TaskCategory v-for="tag in tags" :key="tag.name" :title="tag.name" :icon="tag.icon" />
        </Stack>
      </Box>
      <Flex class="flex-col gap-5 overflow-hidden">
        <Heading size="sm">Today's Tasks</Heading>
        <Stack class="flex-1 gap-4 overflow-auto rounded-xl  _sm:max-h-[calc((3*80px)-(80px/3)+2*1rem)]">
          <Text v-if="errorMsg" class="text-center">{{ errorMsg }}</Text>
          <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
        </Stack>
      </Flex>
      <Button class="p-6 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700" @click="handleTaskClick">+ Add a
        new task</Button>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import TaskCategory from '@/components/task/task-category.vue';
import TaskItem from '@/components/task/task-item.vue';
import Button from '@/components/ui/form/button.vue';
import Box from '@/components/ui/layout/box.vue';
import Container from '@/components/ui/layout/container.vue';
import Flex from '@/components/ui/layout/flex.vue';
import Stack from '@/components/ui/layout/stack.vue';
import Heading from '@/components/ui/typography/heading.vue';
import Text from '@/components/ui/typography/text.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export type Task = {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  completed?: boolean;
  updatedAt?: string;
};

export type TaskTag = {
  name: string;
  icon: string;
}

const tasks = ref<Task[]>([]);
const errorMsg = ref<string>("");

const tags = ref<TaskTag[]>([
  {
    name: 'Design',
    icon: 'md-rocketlaunch',
  },
  {
    name: 'Sport',
    icon: 'md-sportsfootball',
  },
  {
    name: 'Business',
    icon: 'md-businesscenter',
  },
  {
    name: 'School',
    icon: 'md-school',
  }
]);

const router = useRouter();

const handleTaskClick = () => {
  router.push('/task/new');
}

fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      errorMsg.value = 'You have no tasks for today!';
    } else {
      (data as Task[]).sort((a, b) => {
        return new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime();
      });

      tasks.value = [...data]
    }
  })
  .catch(error => {
    console.error('You have no tasks for today!', error);
    errorMsg.value = 'You have no tasks for today!';
  });

</script>
