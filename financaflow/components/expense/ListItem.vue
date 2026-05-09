<template>
  <div class="expense-item" :class="{ selected }">
    <label class="checkbox-wrapper">
      <input type="checkbox" :checked="selected" @change="$emit('toggle')" />
    </label>
    <div class="expense-info" @click="$emit('edit', expense)">
      <span class="expense-icon">{{ expense.category?.icon || '📁' }}</span>
      <div class="expense-details">
        <span class="expense-description">{{ expense.description || 'Sense descripció' }}</span>
        <span class="expense-category">{{ expense.category?.name }}</span>
      </div>
    </div>
    <div class="expense-meta">
      <span class="expense-amount">-{{ expense.amount.toFixed(2) }}€</span>
      <span class="expense-date">{{ formatDate(expense.date) }}</span>
    </div>
    <div class="expense-actions">
      <button @click="$emit('edit', expense)">✏️</button>
      <button @click="$emit('delete', expense.id)">🗑️</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Expense {
  id: number
  amount: number
  description: string
  date: string
  category?: {
    name: string
    icon: string
  }
}

defineProps<{
  expense: Expense
  selected: boolean
}>()

defineEmits(['toggle', 'edit', 'delete'])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ca-ES', {
    day: '2-digit',
    month: 'short'
  })
}
</script>

<style scoped>
.expense-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.expense-item.selected {
  background: var(--bg-tertiary);
}

.expense-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.expense-icon {
  font-size: 1.25rem;
}

.expense-details {
  display: flex;
  flex-direction: column;
}

.expense-description {
  font-weight: 500;
}

.expense-category {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.expense-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.expense-amount {
  font-weight: 600;
  color: var(--color-danger);
}

.expense-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.expense-actions {
  display: flex;
  gap: 0.25rem;
}

.expense-actions button {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  opacity: 0.6;
}

.expense-actions button:hover {
  opacity: 1;
}

.checkbox-wrapper input {
  width: 18px;
  height: 18px;
}
</style>