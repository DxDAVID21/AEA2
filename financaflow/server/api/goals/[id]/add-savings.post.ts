export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  const body = await readBody(event)
  const { amount, note } = body

  if (amount === undefined) {
    throw createError({ statusCode: 400, message: 'amount is required' })
  }

  const goal = await prisma.goal.findUnique({ where: { id } })
  
  if (!goal) {
    throw createError({ statusCode: 404, message: 'Goal not found' })
  }

  const newAmount = Math.max(0, goal.currentAmount + amount)
  const newPercentage = Math.min(100, Math.round((newAmount / goal.targetAmount) * 100))
  const oldPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100)

  const milestones: any[] = []
  const milestonePoints = [25, 50, 75, 100]
  
  for (const point of milestonePoints) {
    if (oldPercentage < point && newPercentage >= point) {
      milestones.push({
        goalId: id,
        percentage: point,
        amount: newAmount,
        note: point === 100 ? 'Goal completed!' : note || null
      })
    }
  }

  const updatedGoal = await prisma.goal.update({
    where: { id },
    data: {
      currentAmount: newAmount,
      isCompleted: newPercentage >= 100,
      ...(milestones.length > 0 && {
        milestones: {
          create: milestones
        }
      })
    },
    include: {
      milestones: true
    }
  })

  return updatedGoal
})