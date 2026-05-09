export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const query = getQuery(event)
  const { categoryId, startDate, endDate, search, limit = 50, offset = 0 } = query

  const where: any = {}

  if (categoryId) {
    where.categoryId = parseInt(categoryId as string)
  }

  if (startDate || endDate) {
    where.date = {}
    if (startDate) where.date.gte = new Date(startDate as string)
    if (endDate) where.date.lte = new Date(endDate as string)
  }

  if (search) {
    where.description = { contains: search as string, mode: 'insensitive' }
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: {
      category: {
        select: { id: true, name: true, color: true, icon: true }
      }
    },
    orderBy: { date: 'desc' },
    take: parseInt(limit as string),
    skip: parseInt(offset as string)
  })

  const total = await prisma.expense.count({ where })

  return { expenses, total }
})