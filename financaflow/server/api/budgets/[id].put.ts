export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  const body = await readBody(event)
  const { month, year, categories } = body

  const budget = await prisma.budget.update({
    where: { id },
    data: {
      ...(month && { month }),
      ...(year && { year }),
      ...(categories && {
        categories: {
          deleteMany: {},
          create: categories.map((cat: { name: string; limit: number; color?: string; icon?: string }) => ({
            name: cat.name,
            limit: cat.limit,
            color: cat.color || '#3B82F6',
            icon: cat.icon || '📁'
          }))
        }
      })
    },
    include: {
      categories: true
    }
  })

  return budget
})