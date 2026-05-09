export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { budgetId, name, limit, color, icon } = body

  if (!budgetId || !name || limit === undefined) {
    throw createError({ statusCode: 400, message: 'budgetId, name, and limit are required' })
  }

  const category = await prisma.category.create({
    data: {
      budgetId,
      name,
      limit,
      color: color || '#3B82F6',
      icon: icon || '📁'
    }
  })

  return category
})