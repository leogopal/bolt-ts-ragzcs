import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckCircle2, Circle, Trash2, GripVertical } from 'lucide-react'
import { useTaskStore } from '../store/taskStore'
import { useSnackbarStore } from './Snackbar'
import { Badge } from './Badge'
import type { Task } from '../store/taskStore'

interface SortableTaskItemProps {
  task: Task
  index: number
}

export function SortableTaskItem({ task, index }: SortableTaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const { toggleTask, updateTaskTitle, deleteTask } = useTaskStore()
  const { showSnackbar } = useSnackbarStore()
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getPriority = (index: number): 'main' | 'secondary' | 'bonus' => {
    if (index === 0) return 'main'
    if (index === 1 || index === 2) return 'secondary'
    return 'bonus'
  }

  const priorityLabels = {
    main: 'Main Priority',
    secondary: 'Secondary Priority',
    bonus: 'Bonus Task'
  }

  const handleToggle = () => {
    toggleTask(task.id)
    showSnackbar(task.completed ? 'Task uncompleted' : 'Task completed', 'info')
  }

  const handleDelete = () => {
    deleteTask(task.id)
    showSnackbar('Task deleted', 'success')
  }

  const handleDoubleClick = () => {
    if (!task.completed) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (title.trim() !== task.title) {
      updateTaskTitle(task.id, title.trim())
      showSnackbar('Task renamed', 'success')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      if (title.trim() !== task.title) {
        updateTaskTitle(task.id, title.trim())
        showSnackbar('Task renamed', 'success')
      }
    }
    if (e.key === 'Escape') {
      setTitle(task.title)
      setIsEditing(false)
    }
  }

  const priority = getPriority(index)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white rounded-lg shadow-sm border border-gray-100 
        ${task.completed ? 'bg-gray-50' : ''} 
        group hover:border-gray-200 transition-colors duration-200`}
    >
      <div className="flex items-start gap-3">
        <button
          className="mt-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          onClick={handleToggle}
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={priority}>
              {priorityLabels[priority]}
            </Badge>
          </div>
          {isEditing ? (
            <input
              type="text"
              className="w-full bg-transparent border-none p-0 focus:ring-2 
                focus:ring-indigo-500 rounded text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <div
              onDoubleClick={handleDoubleClick}
              className={`w-full ${
                task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {task.title}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div
            {...attributes}
            {...listeners}
            className="p-1 cursor-grab text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}