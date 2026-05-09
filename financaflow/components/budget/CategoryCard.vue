<template>
  <div class="category-card" :style="{ borderLeftColor: category.color }">
    <div class="category-header">
      <span class="category-icon">{{ category.icon }}</span>
      <span class="category-name">{{ category.name }}</span>
      <div class="category-actions">
        <button class="action-btn" @click="$emit('edit', category)">✏️</button>
        <button class="action-btn" @click="$emit('delete', category.id)">🗑️</button>
      </div>
    </div>
    <div class="category-progress">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{
            width: `${percentage}%`,
            backgroundColor: statusColor
          }"
        ></div>
      </div>
      <div class="progress-info">
        <span :style="{ color: statusColor }">
          {{ spent.toFixed(2) }}€ / {{ category.limit.toFixed(2) }}€
        </span>
        <span :class="statusClass">{{ statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: number
  name: string
  icon: string
  color: string
  limit: number
  spent: number
}

const props = defineProps<{
  category: Category
}>()

defineEmits(['edit', 'delete'])

const spent = computed(() => props.category.spent || 0)

const percentage = computed(() => {
  return Math.min(100, Math.round((spent.value / props.category.limit) * 100))
})

const statusColor = computed(() => {
  if (percentage.value >= 100) return 'var(--color-danger)'
  if (percentage.value >= 80) return 'var(--color-warning)'
  return props.category.color || 'var(--color-primary)'
})

const statusClass = computed(() => {
  if (percentage.value >= 100) return 'status danger'
  if (percentage.value >= 80) return 'status warning'
  return 'status ok'
})

const statusText = computed(() => {
  if (percentage.value >= 100) return `+${(spent.value - props.category.limit).toFixed(2)}€`
  return `${(props.category.limit - spent.value).toFixed(2)}€ restant`
})
</script>

<style scoped>
.category-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
  border-left: 4px solid;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.category-icon {
  font-size: 1.25rem;
}

.category-name {
  flex: 1;
  font-weight: 600;
}

.category-actions {
  display: flex;
  gap: 0.25rem;
}

.action-btn {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity var(--transition-fast);
}

.action-btn:hover {
  opacity: 1;
}

.progress-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.status {
  font-weight: 600;
}

.status.ok {
  color: var(--color-success);
}

.status.warning {
  color: var(--color-warning);
}

.status.danger {
  color: var(--color-danger);
}
</style>