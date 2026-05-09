<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ goal ? 'Editar' : 'Nou' }} Objectiu</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <form @submit.prevent="submit" class="modal-body">
        <div class="form-group">
          <label>Nom</label>
          <input v-model="form.name" type="text" required placeholder="Ex: Viatge a Japó" />
        </div>
        <div class="form-group">
          <label>Quantitat objectiu (€)</label>
          <input v-model.number="form.targetAmount" type="number" step="0.01" min="0" required />
        </div>
        <div class="form-group">
          <label>Data objectiu (opcional)</label>
          <input v-model="form.targetDate" type="date" />
        </div>
        <div class="form-group">
          <label>Icona</label>
          <div class="icon-grid">
            <button
              v-for="icon in icons"
              :key="icon"
              type="button"
              :class="['icon-btn', { active: form.icon === icon }]"
              @click="form.icon = icon"
            >
              {{ icon }}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label>Color</label>
          <div class="color-grid">
            <button
              v-for="color in colors"
              :key="color"
              type="button"
              :class="['color-btn', { active: form.color === color }]"
              :style="{ backgroundColor: color }"
              @click="form.color = color"
            ></button>
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel·lar</button>
          <button type="submit" class="btn-primary">{{ goal ? 'Guardar' : 'Crear' }}</button>
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
  color: string
  targetAmount: number
  targetDate: string | null
}

const props = defineProps<{
  goal?: Goal | null
}>()

const emit = defineEmits(['close', 'saved'])

const icons = ['🎯', '🗾', '🚲', '🏠', '🚗', '💻', '📱', '🎸', '✈️', '🎓', '💍', '👶']
const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

const form = reactive({
  name: props.goal?.name || '',
  targetAmount: props.goal?.targetAmount || 0,
  targetDate: props.goal?.targetDate?.split('T')[0] || '',
  icon: props.goal?.icon || '🎯',
  color: props.goal?.color || '#10B981'
})

const submit = async () => {
  if (props.goal) {
    await $fetch(`/api/goals/${props.goal.id}`, {
      method: 'PUT',
      body: {
        name: form.name,
        targetAmount: form.targetAmount,
        targetDate: form.targetDate || null,
        icon: form.icon,
        color: form.color
      }
    })
  } else {
    await $fetch('/api/goals', {
      method: 'POST',
      body: {
        name: form.name,
        targetAmount: form.targetAmount,
        targetDate: form.targetDate || null,
        icon: form.icon,
        color: form.color
      }
    })
  }
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

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.icon-btn {
  padding: 0.5rem;
  font-size: 1.25rem;
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.icon-btn.active {
  border-color: var(--color-primary);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.5rem;
}

.color-btn {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.color-btn.active {
  border-color: var(--text-primary);
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