export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const query = getQuery(event)
  const budgetId = parseInt(query.budgetId as string)

  if (!budgetId) {
    throw createError({ statusCode: 400, message: 'budgetId is required' })
  }

  const categories = await prisma.category.findMany({
    where: { budgetId },
    include: {
      _count: { select: { expenses: true } }
    },
    orderBy: { name: 'asc' }
  })

  return categories
})