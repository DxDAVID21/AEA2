export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { ids } = body

  if (!ids || !Array.isArray(ids)) {
    throw createError({ statusCode: 400, message: 'ids array is required' })
  }

  await prisma.expense.deleteMany({
    where: { id: { in: ids } }
  })

  return { success: true, count: ids.length }
})