export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { categoryId, amount, description, date } = body

  if (!categoryId || amount === undefined) {
    throw createError({ statusCode: 400, message: 'categoryId and amount are required' })
  }

  const expense = await prisma.expense.create({
    data: {
      categoryId,
      amount,
      description: description || '',
      date: date ? new Date(date) : new Date()
    },
    include: {
      category: {
        select: { id: true, name: true, color: true, icon: true }
      }
    }
  })

  return expense
})