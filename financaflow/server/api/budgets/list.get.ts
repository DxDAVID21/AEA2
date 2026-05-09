export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const budgets = await prisma.budget.findMany({
    orderBy: [
      { year: 'desc' },
      { month: 'desc' }
    ],
    include: {
      categories: true
    }
  })

  return budgets
})