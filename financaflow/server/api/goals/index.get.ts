export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const goals = await prisma.goal.findMany({
    include: {
      milestones: {
        orderBy: { achievedAt: 'desc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return goals
})