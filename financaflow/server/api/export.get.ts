export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const query = getQuery(event)
  const { categoryId, startDate, endDate } = query

  const where: any = {}

  if (categoryId) {
    where.categoryId = parseInt(categoryId as string)
  }

  if (startDate || endDate) {
    where.date = {}
    if (startDate) where.date.gte = new Date(startDate as string)
    if (endDate) where.date.lte = new Date(endDate as string)
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: {
      category: { select: { name: true } }
    },
    orderBy: { date: 'desc' }
  })

  if (expenses.length === 0) {
    setResponseStatus(event, 404)
    return { error: 'No expenses to export' }
  }

  const bom = '\uFEFF'
  const headers = 'Date,Description,Category,Amount\n'
  
  const rows = expenses.map(exp => {
    const date = new Date(exp.date).toLocaleDateString('ca-ES')
    const description = (exp.description || '').replace(/"/g, '""')
    const category = exp.category.name
    const amount = exp.amount.toFixed(2)
    return `"${date}","${description}","${category}",${amount}`
  }).join('\n')

  const csv = bom + headers + rows

  const filename = `financaflow-expenses-${new Date().toISOString().split('T')[0]}.csv`

  setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
  setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)

  return csv
})