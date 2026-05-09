<template>
  <div class="expenses-page page">
    <div class="page-header">
      <h1>Despeses</h1>
      <div class="header-actions">
        <button class="btn-secondary" @click="exportExpenses" :disabled="!expenses.length">
          📥 Exportar
        </button>
        <button class="btn-primary" @click="showAddModal = true">+ Afegir</button>
      </div>
    </div>

    <div class="filters">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar despeses..."
        class="search-input"
      />
      <select v-model="filterCategory" class="filter-select">
        <option value="">Totes les categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.icon }} {{ cat.name }}
        </option>
      </select>
      <input v-model="startDate" type="date" class="date-input" />
      <input v-model="endDate" type="date" class="date-input" />
    </div>

    <div v-if="loading" class="loading">
      <div class="skeleton" style="height: 60px; margin-bottom: 0.5rem;" v-for="i in 5" :key="i"></div>
    </div>

    <div v-else-if="expenses.length === 0" class="empty-state">
      <p>No hi ha despeses</p>
      <button class="btn-primary" @click="showAddModal = true">Afegeix la teva primera despesa</button>
    </div>

    <div v-else class="expenses-list">
      <div class="list-header">
        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
        </label>
        <span class="header-label">Seleccionar tot</span>
        <button v-if="selected.length > 0" class="btn-danger" @click="bulkDelete">
          Eliminar {{ selected.length }}
        </button>
      </div>

      <ExpenseListItem
        v-for="expense in expenses"
        :key="expense.id"
        :expense="expense"
        :selected="selected.includes(expense.id)"
        @toggle="toggleSelect(expense.id)"
        @edit="editExpense"
        @delete="deleteExpense"
      />

      <div v-if="hasMore" class="load-more">
        <button @click="loadMore">Carregar més</button>
      </div>
    </div>

    <ExpenseFormModal
      v-if="showAddModal"
      :categories="categories"
      :expense="editingExpense"
      @close="closeModal"
      @saved="onExpenseSaved"
    />

    <div class="quick-add-hint">
      Prem <kbd>Ctrl</kbd> + <kbd>N</kbd> per afegir ràpidament
    </div>
  </div>
</template>

<script setup lang="ts">
const showAddModal = ref(false)
const editingExpense = ref<any>(null)
const loading = ref(false)
const selected = ref<number[]>([])
const selectAll = ref(false)
const hasMore = ref(false)
const page = ref(0)

const search = ref('')
const filterCategory = ref('')
const startDate = ref('')
const endDate = ref('')
const limit = 20

const { data: categoriesData } = await useFetch<any[]>('/api/categories', {
  query: { budgetId: 1 }
})

const categories = computed(() => categoriesData.value || [])

const { data: expensesData, refresh: refreshExpenses } = await useFetch<{ expenses: any[]; total: number }>('/api/expenses', {
  query: computed(() => ({
    search: search.value || undefined,
    categoryId: filterCategory.value || undefined,
    startDate: startDate.value || undefined,
    endDate: endDate.value || undefined,
    limit,
    offset: page.value * limit
  })),
  watch: [search, filterCategory, startDate, endDate, page]
})

const expenses = computed(() => expensesData.value?.expenses || [])

const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = expenses.value.map((e: any) => e.id)
  } else {
    selected.value = []
  }
}

const toggleSelect = (id: number) => {
  const index = selected.value.indexOf(id)
  if (index === -1) {
    selected.value.push(id)
  } else {
    selected.value.splice(index, 1)
  }
}

const editExpense = (expense: any) => {
  editingExpense.value = expense
  showAddModal.value = true
}

const deleteExpense = async (id: number) => {
  if (confirm('Segur que vols eliminar aquesta despesa?')) {
    await $fetch(`/api/expenses/${id}`, { method: 'DELETE' })
    refreshExpenses()
  }
}

const bulkDelete = async () => {
  if (confirm(`Segur que vols eliminar ${selected.value.length} despeses?`)) {
    await $fetch('/api/expenses/bulk-delete', {
      method: 'POST',
      body: { ids: selected.value }
    })
    selected.value = []
    selectAll.value = false
    refreshExpenses()
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingExpense.value = null
}

const onExpenseSaved = () => {
  closeModal()
  refreshExpenses()
}

const loadMore = () => {
  page.value++
  hasMore.value = (expensesData.value?.expenses.length || 0) >= limit
}

const exportExpenses = () => {
  const params = new URLSearchParams()
  if (filterCategory.value) params.set('categoryId', filterCategory.value)
  if (startDate.value) params.set('startDate', startDate.value)
  if (endDate.value) params.set('endDate', endDate.value)
  
  window.location.href = `/api/export?${params.toString()}`
}

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault()
      showAddModal.value = true
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
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
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}

.btn-danger {
  padding: 0.5rem 1rem;
  background: var(--color-danger);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  min-width: 150px;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.filter-select,
.date-input {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.expenses-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
}

.checkbox-wrapper input {
  width: 18px;
  height: 18px;
}

.header-label {
  flex: 1;
  font-size: 0.875rem;
  color: var(--text-secondary);
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

.load-more {
  text-align: center;
  padding: 1rem;
}

.load-more button {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.quick-add-hint {
  position: fixed;
  bottom: 6rem;
  right: 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

kbd {
  background: var(--bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  border: 1px solid var(--border-color);
}
</style>