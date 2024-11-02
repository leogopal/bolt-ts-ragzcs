import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { useSnackbarStore } from './Snackbar'

export function AddTask() {
  const [title, setTitle] = useState('')
  const { tasks, addTask } = useTaskStore()
  const { showSnackbar } = useSnackbarStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (tasks.length >= 6) {
      showSnackbar('Maximum 6 tasks allowed', 'warning')
      return
    }
    
    if (title.trim()) {
      addTask(title.trim())
      setTitle('')
      showSnackbar('Task added successfully', 'success')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="task-title" className="text-sm font-medium text-gray-700">
              Task Title {tasks.length}/6
            </label>
            <div className="flex gap-2">
              <input
                id="task-title"
                type="text"
                placeholder={tasks.length >= 6 ? "Maximum tasks reached" : "Enter task title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={tasks.length >= 6}
                className="flex-1 rounded-lg border-gray-200 shadow-sm 
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={tasks.length >= 6 || !title.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                  hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
                  flex items-center gap-2 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>
            {tasks.length >= 6 && (
              <p className="text-sm text-amber-600">
                Maximum number of tasks reached
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}