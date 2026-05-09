export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const id = parseInt(getRouterParam(event, 'id') || '0')

  await prisma.budget.delete({
    where: { id }
  })

  return { success: true }
})