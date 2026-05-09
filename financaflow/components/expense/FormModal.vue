<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ expense ? 'Editar' : 'Afegir' }} Despesa</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <form @submit.prevent="submit" class="modal-body">
        <div class="form-group">
          <label>Quantitat (€)</label>
          <input v-model.number="form.amount" type="number" step="0.01" min="0" required />
        </div>
        <div class="form-group">
          <label>Descripció</label>
          <input v-model="form.description" type="text" placeholder="Ex: Dinar al restaurant" />
        </div>
        <div class="form-group">
          <label>Categoria</label>
          <select v-model="form.categoryId" required>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.icon }} {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Data</label>
          <input v-model="form.date" type="date" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel·lar</button>
          <button type="submit" class="btn-primary">{{ expense ? 'Guardar' : 'Afegir' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: number
  name: string
  icon: string
}

interface Expense {
  id: number
  amount: number
  description: string
  categoryId: number
  date: string
}

const props = defineProps<{
  categories: Category[]
  expense?: Expense | null
}>()

const emit = defineEmits(['close', 'saved'])

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  amount: props.expense?.amount || 0,
  description: props.expense?.description || '',
  categoryId: props.expense?.categoryId || (props.categories[0]?.id || 0),
  date: props.expense?.date?.split('T')[0] || today
})

const submit = async () => {
  if (props.expense) {
    await $fetch(`/api/expenses/${props.expense.id}`, {
      method: 'PUT',
      body: form
    })
  } else {
    await $fetch('/api/expenses', {
      method: 'POST',
      body: form
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

.form-group input,
.form-group select {
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