export function useApi() {
  const fetchBudget = async (month: number, year: number) => {
    return await $fetch<any>('/api/budgets/get', {
      query: { month, year }
    })
  }

  const fetchCategories = async (budgetId: number) => {
    return await $fetch<any[]>('/api/categories', {
      query: { budgetId }
    })
  }

  const fetchExpenses = async (params?: {
    categoryId?: number
    startDate?: string
    endDate?: string
    search?: string
    limit?: number
    offset?: number
  }) => {
    return await $fetch<{ expenses: any[]; total: number }>('/api/expenses', {
      query: params
    })
  }

  const fetchGoals = async () => {
    return await $fetch<any[]>('/api/goals')
  }

  const fetchInsight = async () => {
    return await $fetch<any>('/api/insights')
  }

  const generateInsight = async () => {
    return await $fetch<any>('/api/insights/generate', { method: 'POST' })
  }

  return {
    fetchBudget,
    fetchCategories,
    fetchExpenses,
    fetchGoals,
    fetchInsight,
    generateInsight
  }
}