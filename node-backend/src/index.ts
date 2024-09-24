import express, { type Request, type Response } from 'express';
import cors from 'cors';
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getTaskById,
} from './data-access/task';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/tasks', async (_req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log('error');
  }
});

app.get('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: 'Task not found' });
  }
});

app.post('/task/new', async (req: Request, res: Response) => {
  const { title, ...rest } = req.body;

  if (!title) {
    return res.status(404).json({ error: 'Title is required' });
  }

  if (typeof title !== 'string') {
    return res.status(404).json({ error: 'Title must be strings' });
  }

  try {
    addTask({ title, ...rest });
    return res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.log(error);
  }
});

app.put('/task/update/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, ...rest } = req.body;

  if (!id) {
    return res.status(400).send('::Error fetching task\nID is required');
  }

  if (!title && !description) {
    return res
      .status(400)
      .send('::Error updating task\nName or description is required');
  }

  try {
    updateTask({ id, title, description, ...rest });
    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.log('error');
  }
});

app.delete('/task/delete/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('::Error deleting task\nID is required');
  }

  try {
    deleteTask(id);
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log('error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
