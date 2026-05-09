<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>Afegir estalvi</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <form @submit.prevent="submit" class="modal-body">
        <div class="goal-info">
          <span class="goal-icon">{{ goal.icon }}</span>
          <span class="goal-name">{{ goal.name }}</span>
        </div>
        <p class="current-progress">
          Actual: {{ goal.currentAmount.toFixed(2) }}€ / {{ goal.targetAmount.toFixed(2) }}€
        </p>
        <div class="form-group">
          <label>Quantitat (€)</label>
          <input
            v-model.number="form.amount"
            type="number"
            step="0.01"
            required
            placeholder="Positiu per afegir, negatiu per treure"
          />
        </div>
        <div class="form-group">
          <label>Nota (opcional)</label>
          <input
            v-model="form.note"
            type="text"
            placeholder="Ex: Prima doble"
          />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel·lar</button>
          <button type="submit" class="btn-primary">Afegir</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Goal {
  id: number
  name: string
  icon: string
  currentAmount: number
  targetAmount: number
}

const props = defineProps<{
  goal: Goal
}>()

const emit = defineEmits(['close', 'saved'])

const form = reactive({
  amount: 0,
  note: ''
})

const submit = async () => {
  await $fetch(`/api/goals/${props.goal.id}/add-savings`, {
    method: 'POST',
    body: form
  })
  emit('saved')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem;
}

.goal-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.goal-icon {
  font-size: 1.5rem;
}

.goal-name {
  font-weight: 600;
}

.current-progress {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
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

.btn-secondary {
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}
</style>