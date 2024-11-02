import { create } from 'zustand'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error'
}

interface NotificationState {
  notification: Notification | null
  showNotification: (message: string, type: 'success' | 'error') => void
  hideNotification: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  showNotification: (message, type) =>
    set({
      notification: {
        id: Date.now().toString(),
        message,
        type,
      },
    }),
  hideNotification: () => set({ notification: null }),
}))