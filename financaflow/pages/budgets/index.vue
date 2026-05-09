<template>
  <div class="budgets-page page">
    <div class="page-header">
      <h1>Pressupostos</h1>
      <button class="btn-primary" @click="showCreateModal = true">+ Nou</button>
    </div>

    <div class="month-selector">
      <button @click="prevMonth" class="nav-btn">←</button>
      <span class="current-month">{{ monthName }} {{ selectedYear }}</span>
      <button @click="nextMonth" class="nav-btn">→</button>
    </div>

    <div v-if="budget" class="budget-details">
      <div class="budget-summary">
        <div class="summary-item">
          <span class="summary-label">Total pressupostat</span>
          <span class="summary-value">{{ totalBudget.toFixed(2) }}€</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Total gastat</span>
          <span class="summary-value spent">{{ totalSpent.toFixed(2) }}€</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Restant</span>
          <span class="summary-value remaining">{{ remaining.toFixed(2) }}€</span>
        </div>
      </div>

      <div class="categories-section">
        <h2>Categories</h2>
        <div class="categories-list">
          <BudgetCategoryCard
            v-for="category in budget.categories"
            :key="category.id"
            :category="category"
            @edit="editCategory"
            @delete="deleteCategory"
          />
        </div>
        <button class="add-category-btn" @click="showCategoryModal = true">
          + Afegir categoria
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No tens un pressupost per {{ monthName }} {{ selectedYear }}</p>
      <div class="actions">
        <button class="btn-primary" @click="createBudget">Crear pressupost</button>
        <button v-if="hasPreviousBudget" class="btn-secondary" @click="clonePrevious">
          Clonar del mes anterior
        </button>
      </div>
    </div>

    <BudgetFormModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @saved="onBudgetCreated"
    />

    <CategoryFormModal
      v-if="showCategoryModal"
      :budget-id="budget?.id"
      @close="showCategoryModal = false"
      @saved="refreshBudget"
    />
  </div>
</template>

<script setup lang="ts">
const now = new Date()
const selectedMonth = ref(now.getMonth() + 1)
const selectedYear = ref(now.getFullYear())

const monthNames = [
  'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
  'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
]

const monthName = computed(() => monthNames[selectedMonth.value - 1])

const showCreateModal = ref(false)
const showCategoryModal = ref(false)

const { data: budget, refresh: refreshBudget } = await useFetch<any>('/api/budgets/get', {
  query: { month: selectedMonth, year: selectedYear }
})

const totalBudget = computed(() => {
  if (!budget.value?.categories) return 0
  return budget.value.categories.reduce((sum: number, cat: any) => sum + cat.limit, 0)
})

const totalSpent = computed(() => {
  if (!budget.value?.categories) return 0
  return budget.value.categories.reduce((sum: number, cat: any) => sum + (cat.spent || 0), 0)
})

const remaining = computed(() => totalBudget.value - totalSpent.value)

const hasPreviousBudget = computed(() => {
  if (selectedMonth.value === 1) {
    return selectedYear.value > 2020
  }
  return true
})

const prevMonth = () => {
  if (selectedMonth.value === 1) {
    selectedMonth.value = 12
    selectedYear.value--
  } else {
    selectedMonth.value--
  }
}

const nextMonth = () => {
  if (selectedMonth.value === 12) {
    selectedMonth.value = 1
    selectedYear.value++
  } else {
    selectedMonth.value++
  }
}

const createBudget = async () => {
  await $fetch('/api/budgets', {
    method: 'POST',
    body: {
      month: selectedMonth.value,
      year: selectedYear.value,
      categories: []
    }
  })
  refreshBudget()
  showCreateModal.value = true
}

const clonePrevious = async () => {
  const prevMonth = selectedMonth.value === 1 ? 12 : selectedMonth.value - 1
  const prevYear = selectedMonth.value === 1 ? selectedYear.value - 1 : selectedYear.value

  const prevBudget = await $fetch<any>('/api/budgets/get', {
    query: { month: prevMonth, year: prevYear }
  })

  if (prevBudget?.categories) {
    await $fetch('/api/budgets', {
      method: 'POST',
      body: {
        month: selectedMonth.value,
        year: selectedYear.value,
        categories: prevBudget.categories.map((cat: any) => ({
          name: cat.name,
          limit: cat.limit,
          color: cat.color,
          icon: cat.icon
        }))
      }
    })
    refreshBudget()
  }
}

const editCategory = (category: any) => {
  // TODO: Implement edit category modal
  console.log('Edit category:', category)
}

const deleteCategory = async (categoryId: number) => {
  if (confirm('Segur que vols eliminar aquesta categoria?')) {
    await $fetch(`/api/categories/${categoryId}`, { method: 'DELETE' })
    refreshBudget()
  }
}

const onBudgetCreated = () => {
  showCreateModal.value = false
  refreshBudget()
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

.btn-secondary {
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
}

.month-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.nav-btn {
  background: var(--bg-secondary);
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.current-month {
  font-weight: 600;
  min-width: 120px;
  text-align: center;
}

.budget-summary {
  display: flex;
  justify-content: space-between;
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.summary-item {
  text-align: center;
}

.summary-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.summary-value {
  font-size: 1.25rem;
  font-weight: 700;
}

.summary-value.spent {
  color: var(--color-danger);
}

.summary-value.remaining {
  color: var(--color-success);
}

.categories-section h2 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.add-category-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: var(--bg-secondary);
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.add-category-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
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

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>