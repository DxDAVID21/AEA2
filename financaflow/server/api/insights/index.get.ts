export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000)

  const insight = await prisma.insight.findFirst({
    where: {
      generatedAt: { gte: sixHoursAgo }
    },
    orderBy: { generatedAt: 'desc' }
  })

  if (insight) {
    return insight
  }

  return null
})