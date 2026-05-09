<template>
  <div class="dashboard page">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="current-period">
        {{ monthName }} {{ currentYear }}
      </div>
    </div>

    <div v-if="budget" class="budget-overview">
      <div class="overview-circle">
        <svg viewBox="0 0 100 100" class="progress-ring">
          <circle
            class="progress-ring-bg"
            cx="50"
            cy="50"
            r="42"
          />
          <circle
            class="progress-ring-fill"
            cx="50"
            cy="50"
            r="42"
            :style="{ strokeDashoffset: circumference - (spentPercent / 100) * circumference }"
          />
        </svg>
        <div class="overview-content">
          <span class="overview-percent">{{ spentPercent }}%</span>
          <span class="overview-label">gastat</span>
        </div>
      </div>

      <div class="overview-stats">
        <div class="stat">
          <span class="stat-value">{{ spentAmount.toFixed(2) }}€</span>
          <span class="stat-label">Gastat</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ totalBudget.toFixed(2) }}€</span>
          <span class="stat-label">Pressupost</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ daysRemaining }}</span>
          <span class="stat-label">Dies restants</span>
        </div>
      </div>

      <NuxtLink to="/expenses" class="add-expense-btn">
        + Afegir despesa
      </NuxtLink>
    </div>

    <div v-else class="empty-state">
      <p>No tens un pressupost per aquest mes.</p>
      <NuxtLink to="/budgets" class="btn-primary">Crear pressupost</NuxtLink>
    </div>

    <DashboardInsightCard v-if="budget" />

    <section v-if="goals.length > 0" class="section">
      <h2>Objectius d'estalvi</h2>
      <div class="goals-grid">
        <DashboardGoalCard
          v-for="goal in goals"
          :key="goal.id"
          :goal="goal"
        />
      </div>
      <NuxtLink to="/goals" class="view-more">Veure tots</NuxtLink>
    </section>

    <section v-if="recentExpenses.length > 0" class="section">
      <h2>Despeses recents</h2>
      <div class="expenses-list">
        <DashboardExpenseItem
          v-for="expense in recentExpenses"
          :key="expense.id"
          :expense="expense"
        />
      </div>
      <NuxtLink to="/expenses" class="view-more">Veure totes</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()

const monthNames = [
  'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
  'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
]

const monthName = computed(() => monthNames[currentMonth - 1])

const { data: budget } = await useFetch<any>('/api/budgets/get', {
  query: { month: currentMonth, year: currentYear }
})

const totalBudget = computed(() => {
  if (!budget.value?.categories) return 0
  return budget.value.categories.reduce((sum: number, cat: any) => sum + cat.limit, 0)
})

const spentAmount = computed(() => {
  if (!budget.value?.categories) return 0
  return budget.value.categories.reduce((sum: number, cat: any) => sum + (cat.spent || 0), 0)
})

const spentPercent = computed(() => {
  if (totalBudget.value === 0) return 0
  return Math.min(100, Math.round((spentAmount.value / totalBudget.value) * 100))
})

const circumference = 2 * Math.PI * 42

const daysRemaining = computed(() => {
  const now = new Date()
  const endOfMonth = new Date(currentYear, currentMonth, 0)
  return Math.max(0, endOfMonth.getDate() - now.getDate())
})

const { data: goals } = await useFetch<any[]>('/api/goals')

const { data: expensesData } = await useFetch<{ expenses: any[] }>('/api/expenses', {
  query: { limit: 5 }
})

const recentExpenses = computed(() => expensesData.value?.expenses || [])
</script>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dashboard-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.current-period {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.budget-overview {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.overview-circle {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 1.5rem;
}

.progress-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-bg {
  fill: none;
  stroke: var(--bg-tertiary);
  stroke-width: 8;
}

.progress-ring-fill {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 263.89;
  transition: stroke-dashoffset 0.5s ease;
}

.overview-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.overview-percent {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
}

.overview-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.overview-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.add-expense-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  color: white;
  text-align: center;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.add-expense-btn:hover {
  background: var(--color-primary-hover);
  text-decoration: none;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
}

.empty-state p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  text-decoration: none;
}

.section {
  margin-bottom: 1.5rem;
}

.section h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.goals-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.expenses-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.view-more {
  display: block;
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-primary);
}
</style>