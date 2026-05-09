export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { name, targetAmount, targetDate, icon, color } = body

  if (!name || targetAmount === undefined) {
    throw createError({ statusCode: 400, message: 'name and targetAmount are required' })
  }

  const goal = await prisma.goal.create({
    data: {
      name,
      targetAmount,
      currentAmount: 0,
      targetDate: targetDate ? new Date(targetDate) : null,
      icon: icon || '🎯',
      color: color || '#10B981'
    },
    include: {
      milestones: true
    }
  })

  return goal
})