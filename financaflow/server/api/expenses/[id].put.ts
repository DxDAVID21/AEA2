export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  const body = await readBody(event)
  const { categoryId, amount, description, date } = body

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      ...(categoryId && { categoryId }),
      ...(amount !== undefined && { amount }),
      ...(description !== undefined && { description }),
      ...(date && { date: new Date(date) })
    },
    include: {
      category: {
        select: { id: true, name: true, color: true, icon: true }
      }
    }
  })

  return expense
})