<template>
  <Teleport to="body">
    <div class="notifications-container">
      <TransitionGroup name="notification">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification', notification.type]"
        >
          <span class="notification-icon">{{ getIcon(notification.type) }}</span>
          <span class="notification-message">{{ notification.message }}</span>
          <button class="notification-close" @click="remove(notification.id)">✕</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { notifications, remove } = useNotifications()

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return '✅'
    case 'warning': return '⚠️'
    case 'error': return '❌'
    default: return 'ℹ️'
  }
}
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 350px;
}

.notification {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid;
}

.notification.success {
  border-color: var(--color-success);
}

.notification.warning {
  border-color: var(--color-warning);
}

.notification.error {
  border-color: var(--color-danger);
}

.notification.info {
  border-color: var(--color-info);
}

.notification-icon {
  font-size: 1.25rem;
}

.notification-message {
  flex: 1;
  font-size: 0.875rem;
}

.notification-close {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  opacity: 0.6;
}

.notification-close:hover {
  opacity: 1;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>