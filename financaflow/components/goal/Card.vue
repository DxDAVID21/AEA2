<template>
  <div class="goal-card" :class="{ completed: goal.isCompleted }" :style="{ borderColor: goal.color }">
    <div class="goal-header">
      <span class="goal-icon">{{ goal.icon }}</span>
      <span class="goal-name">{{ goal.name }}</span>
      <div class="goal-actions">
        <button @click="$emit('add-savings', goal)">💰</button>
        <button @click="$emit('edit', goal)">✏️</button>
        <button @click="$emit('delete', goal.id)">🗑️</button>
      </div>
    </div>

    <div class="goal-amounts">
      <span class="current">{{ goal.currentAmount.toFixed(2) }}€</span>
      <span class="separator">/</span>
      <span class="target">{{ goal.targetAmount.toFixed(2) }}€</span>
    </div>

    <div class="goal-progress">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{
            width: `${percentage}%`,
            backgroundColor: goal.color
          }"
        ></div>
      </div>
      <span class="progress-text">{{ percentage }}%</span>
    </div>

    <div class="goal-meta">
      <span v-if="goal.targetDate" class="target-date">
        📅 {{ formatDate(goal.targetDate) }}
      </span>
      <span v-if="estimatedDate" class="estimated">
        Est. {{ estimatedDate }}
      </span>
      <span v-if="goal.isCompleted" class="badge">Complet!</span>
    </div>

    <div v-if="goal.milestones?.length" class="milestones">
      <span
        v-for="milestone in goal.milestones"
        :key="milestone.id"
        class="milestone-badge"
      >
        {{ milestone.percentage }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Goal {
  id: number
  name: string
  icon: string
  color: string
  targetAmount: number
  currentAmount: number
  targetDate: string | null
  isCompleted: boolean
  milestones?: Array<{ id: number; percentage: number }>
}

const props = defineProps<{
  goal: Goal
}>()

defineEmits(['add-savings', 'edit', 'delete'])

const percentage = computed(() => {
  return Math.min(100, Math.round((props.goal.currentAmount / props.goal.targetAmount) * 100))
})

const estimatedDate = computed(() => {
  if (props.goal.isCompleted || props.goal.currentAmount === 0) return null
  
  const remaining = props.goal.targetAmount - props.goal.currentAmount
  const avgPerDay = props.goal.currentAmount / 30
  const daysNeeded = Math.ceil(remaining / avgPerDay)
  
  const estimated = new Date()
  estimated.setDate(estimated.getDate() + daysNeeded)
  
  if (estimated > new Date(2030, 0, 1)) return null
  
  return estimated.toLocaleDateString('ca-ES', { month: 'short', year: 'numeric' })
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ca-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.goal-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  border-left: 4px solid;
}

.goal-card.completed {
  opacity: 0.8;
}

.goal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.goal-icon {
  font-size: 1.5rem;
}

.goal-name {
  flex: 1;
  font-weight: 600;
  font-size: 1.125rem;
}

.goal-actions {
  display: flex;
  gap: 0.25rem;
}

.goal-actions button {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  opacity: 0.6;
}

.goal-actions button:hover {
  opacity: 1;
}

.goal-amounts {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.current {
  color: var(--text-primary);
}

.separator {
  color: var(--text-muted);
  margin: 0 0.25rem;
}

.target {
  color: var(--text-secondary);
  font-weight: 500;
}

.goal-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.progress-text {
  font-weight: 600;
  font-size: 0.875rem;
}

.goal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.target-date,
.estimated {
  background: var(--bg-tertiary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.badge {
  background: var(--color-success);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.milestones {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.75rem;
}

.milestone-badge {
  background: var(--bg-tertiary);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  font-size: 0.625rem;
  font-weight: 600;
}
</style>