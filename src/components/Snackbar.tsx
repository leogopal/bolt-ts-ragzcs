import React from 'react'
import { create } from 'zustand'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

type SnackbarType = 'success' | 'error' | 'warning' | 'info'

interface SnackbarState {
  message: string | null
  show: boolean
  type: SnackbarType
  showSnackbar: (message: string, type: SnackbarType) => void
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: null,
  show: false,
  type: 'info',
  showSnackbar: (message, type) => {
    set({ message, type, show: true })
    setTimeout(() => set({ show: false }), 3000)
  },
}))

export function Snackbar() {
  const { message, show, type } = useSnackbarStore()

  if (!show) return null

  const variants = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  }

  return (
    <div className="fixed bottom-4 right-4 animate-slide-up">
      <div className={`
        flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border
        ${variants[type]}
      `}>
        {icons[type]}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}