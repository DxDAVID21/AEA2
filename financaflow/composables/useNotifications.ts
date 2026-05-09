import { ref } from 'vue'

interface Notification {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  timeout?: number
}

const notifications = ref<Notification[]>([])
let nextId = 1

export function useNotifications() {
  const add = (notification: Omit<Notification, 'id'>) => {
    const id = nextId++
    const newNotification: Notification = { ...notification, id }
    notifications.value.push(newNotification)

    const timeout = notification.timeout ?? 5000
    if (timeout > 0) {
      setTimeout(() => {
        remove(id)
      }, timeout)
    }

    return id
  }

  const remove = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message: string, timeout?: number) => {
    return add({ type: 'success', message, timeout })
  }

  const warning = (message: string, timeout?: number) => {
    return add({ type: 'warning', message, timeout })
  }

  const error = (message: string, timeout?: number) => {
    return add({ type: 'error', message, timeout })
  }

  const info = (message: string, timeout?: number) => {
    return add({ type: 'info', message, timeout })
  }

  return {
    notifications,
    add,
    remove,
    success,
    warning,
    error,
    info
  }
}