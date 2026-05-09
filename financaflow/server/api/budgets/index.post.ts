export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { month, year, categories } = body

  if (!month || !year) {
    throw createError({ statusCode: 400, message: 'Month and year are required' })
  }

  const budget = await prisma.budget.create({
    data: {
      month,
      year,
      categories: {
        create: categories?.map((cat: { name: string; limit: number; color?: string; icon?: string }) => ({
          name: cat.name,
          limit: cat.limit,
          color: cat.color || '#3B82F6',
          icon: cat.icon || '📁'
        })) || []
      }
    },
    include: {
      categories: true
    }
  })

  return budget
})