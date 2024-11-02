import { create } from 'zustand'

export interface Task {
  id: string
  title: string
  completed: boolean
}

interface TaskState {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  updateTaskTitle: (id: string, title: string) => void
  deleteTask: (id: string) => void
  reorderTasks: (tasks: Task[]) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: crypto.randomUUID(), title, completed: false }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  updateTaskTitle: (id, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  reorderTasks: (tasks) => set({ tasks }),
}))