import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  importance: boolean;
  urgency: boolean;
  createdAt: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  clearTasks: () => void;
  getTodayCompletedCount: () => number;
  getTodayTasksCount: () => number;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        })),
      clearTasks: () => set({ tasks: [] }),
      getTodayCompletedCount: () => {
        const today = new Date().toDateString();
        return get().tasks.filter(
          (t) =>
            t.isCompleted &&
            new Date(t.createdAt).toDateString() === today
        ).length;
      },
      getTodayTasksCount: () => {
        const today = new Date().toDateString();
        return get().tasks.filter(
          (t) => new Date(t.createdAt).toDateString() === today
        ).length;
      },
    }),
    {
      name: 'task-store',
      version: 1,
    }
  )
);
