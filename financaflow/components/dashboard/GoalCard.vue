<template>
  <div class="goal-card" :style="{ borderLeftColor: goal.color }">
    <div class="goal-header">
      <span class="goal-icon">{{ goal.icon }}</span>
      <span class="goal-name">{{ goal.name }}</span>
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
      <div class="progress-text">
        <span>{{ goal.currentAmount.toFixed(2) }}€</span>
        <span>/ {{ goal.targetAmount.toFixed(2) }}€</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Goal {
  id: number
  name: string
  icon: string
  color: string
  currentAmount: number
  targetAmount: number
}

const props = defineProps<{
  goal: Goal
}>()

const percentage = computed(() => {
  return Math.min(100, Math.round((props.goal.currentAmount / props.goal.targetAmount) * 100))
})
</script>

<style scoped>
.goal-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 1rem;
  border-left: 4px solid;
}

.goal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.goal-icon {
  font-size: 1.25rem;
}

.goal-name {
  font-weight: 600;
}

.goal-progress {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  transition: width 0.5s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
}
</style>