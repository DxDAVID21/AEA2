<template>
  <div class="expense-item">
    <div class="expense-info">
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
}>()

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
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.expense-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
</style>