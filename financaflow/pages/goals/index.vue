<template>
  <div class="goals-page page">
    <div class="page-header">
      <h1>Objectius d'estalvi</h1>
      <button class="btn-primary" @click="showAddModal = true">+ Nou</button>
    </div>

    <div v-if="loading" class="loading">
      <div class="skeleton" style="height: 100px;" v-for="i in 3" :key="i"></div>
    </div>

    <div v-else-if="goals.length === 0" class="empty-state">
      <p>No tens cap objectiu d'estalvi</p>
      <button class="btn-primary" @click="showAddModal = true">Crea el teu primer objectiu</button>
    </div>

    <div v-else class="goals-grid">
      <GoalCard
        v-for="goal in goals"
        :key="goal.id"
        :goal="goal"
        @add-savings="openAddSavings"
        @edit="editGoal"
        @delete="deleteGoal"
      />
    </div>

    <GoalFormModal
      v-if="showAddModal"
      :goal="editingGoal"
      @close="closeModal"
      @saved="onGoalSaved"
    />

    <AddSavingsModal
      v-if="showSavingsModal"
      :goal="selectedGoal"
      @close="showSavingsModal = false"
      @saved="onSavingsAdded"
    />
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
}

const showAddModal = ref(false)
const showSavingsModal = ref(false)
const editingGoal = ref<Goal | null>(null)
const selectedGoal = ref<Goal | null>(null)
const loading = ref(false)

const { data: goals, refresh: refreshGoals } = await useFetch<Goal[]>('/api/goals')

const openAddSavings = (goal: Goal) => {
  selectedGoal.value = goal
  showSavingsModal.value = true
}

const editGoal = (goal: Goal) => {
  editingGoal.value = goal
  showAddModal.value = true
}

const deleteGoal = async (id: number) => {
  const goal = goals.value?.find(g => g.id === id)
  const message = goal?.isCompleted 
    ? 'Aquest objectiu està complet. Segur que vols eliminar-lo?'
    : 'Segur que vols eliminar aquest objectiu?'
  
  if (confirm(message)) {
    await $fetch(`/api/goals/${id}`, { method: 'DELETE' })
    refreshGoals()
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingGoal.value = null
}

const onGoalSaved = () => {
  closeModal()
  refreshGoals()
}

const onSavingsAdded = () => {
  showSavingsModal.value = false
  selectedGoal.value = null
  refreshGoals()
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.btn-primary {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}

.goals-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.empty-state p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.loading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>