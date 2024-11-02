import React, { useState, useRef, useEffect } from 'react'
import { CheckCircle2, Circle, GripVertical } from 'lucide-react'
import { Draggable } from 'react-beautiful-dnd'

interface TaskItemProps {
  id: string
  title: string
  priority: 'main' | 'secondary' | 'bonus'
  completed: boolean
  index: number
  onToggle: () => void
  onTitleChange: (newTitle: string) => void
}

export function TaskItem({ id, title, priority, completed, index, onToggle, onTitleChange }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const priorityStyles = {
    main: 'bg-red-100 text-red-800',
    secondary: 'bg-blue-100 text-blue-800',
    bonus: 'bg-green-100 text-green-800'
  }

  const priorityLabels = {
    main: 'Main Priority',
    secondary: 'Secondary Priority',
    bonus: 'Bonus Task'
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    if (editedTitle.trim() !== '') {
      onTitleChange(editedTitle.trim())
    } else {
      setEditedTitle(title)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur()
    } else if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing(false)
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-4 bg-white rounded-lg shadow-sm border border-gray-100 ${completed ? 'bg-gray-50' : ''}`}
        >
          <div className="flex items-start gap-3">
            <div {...provided.dragHandleProps} className="mt-1 text-gray-400">
              <GripVertical className="w-5 h-5" />
            </div>
            <div
              className="mt-1 text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onToggle()
              }}
            >
              {completed ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityStyles[priority]}`}>
                  {priorityLabels[priority]}
                </span>
              </div>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none p-0 focus:ring-2 focus:ring-indigo-500 rounded"
                />
              ) : (
                <div
                  onDoubleClick={handleDoubleClick}
                  className={`w-full cursor-text ${completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}
                >
                  {title}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}