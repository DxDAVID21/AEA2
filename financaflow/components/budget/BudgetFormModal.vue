<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>Crear Pressupost</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <form @submit.prevent="submit" class="modal-body">
        <div class="form-group">
          <label>Mes</label>
          <select v-model="form.month" required>
            <option v-for="(name, i) in months" :key="i" :value="i + 1">{{ name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Any</label>
          <input v-model.number="form.year" type="number" required min="2020" />
        </div>
        <div class="form-group">
          <label>Categories inicials (opcional)</label>
          <div v-for="(cat, i) in form.categories" :key="i" class="category-input">
            <input v-model="cat.name" placeholder="Nom" />
            <input v-model.number="cat.limit" type="number" placeholder="Límit" step="0.01" />
            <button type="button" @click="removeCategory(i)">✕</button>
          </div>
          <button type="button" class="add-btn" @click="addCategory">+ Afegir categoria</button>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel·lar</button>
          <button type="submit" class="btn-primary">Crear</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'saved'])

const now = new Date()
const months = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']

const form = reactive({
  month: now.getMonth() + 1,
  year: now.getFullYear(),
  categories: [] as { name: string; limit: number; color: string; icon: string }[]
})

const addCategory = () => {
  form.categories.push({ name: '', limit: 0, color: '#3B82F6', icon: '📁' })
}

const removeCategory = (index: number) => {
  form.categories.splice(index, 1)
}

const submit = async () => {
  const validCategories = form.categories.filter(c => c.name && c.limit > 0)
  
  await $fetch('/api/budgets', {
    method: 'POST',
    body: {
      month: form.month,
      year: form.year,
      categories: validCategories
    }
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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
  font-size: 1.25rem;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.category-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.category-input input {
  flex: 1;
}

.category-input button {
  background: var(--color-danger);
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.add-btn {
  background: none;
  border: 1px dashed var(--border-color);
  padding: 0.5rem;
  width: 100%;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text-secondary);
}

.add-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
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