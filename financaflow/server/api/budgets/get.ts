import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const query = getQuery(event)
  const month = parseInt(query.month as string) || new Date().getMonth() + 1
  const year = parseInt(query.year as string) || new Date().getFullYear()

  const budget = await prisma.budget.findUnique({
    where: { month_year: { month, year } },
    include: {
      categories: {
        include: {
          expenses: {
            select: { amount: true }
          }
        }
      }
    }
  })

  if (!budget) {
    return null
  }

  const categoriesWithSpent = budget.categories.map(cat => ({
    ...cat,
    spent: cat.expenses.reduce((sum, exp) => sum + exp.amount, 0)
  }))

  return {
    ...budget,
    categories: categoriesWithSpent
  }
})