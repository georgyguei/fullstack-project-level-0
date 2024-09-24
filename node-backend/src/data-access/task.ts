import type { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';

export type Task = Prisma.TaskCreateInput;

export const getTasks = async () => {
  const tasks = await prisma.task.findMany();

  return tasks;
};

export const getTaskById = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  return task;
};

export const addTask = async (task: Task) => {
  await prisma.task.create({
    data: task,
  });
};

export const updateTask = async ({ id, ...task }: Partial<Task>) => {
  await prisma.task.update({
    where: { id: id },
    data: {
      ...task,
      updatedAt: new Date(),
    },
  });
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({
    where: { id },
  });
};
