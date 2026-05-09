export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  const body = await readBody(event)
  const { name, targetAmount, targetDate, icon, color } = body

  const goal = await prisma.goal.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(targetAmount !== undefined && { targetAmount }),
      ...(targetDate !== undefined && { 
        targetDate: targetDate ? new Date(targetDate) : null 
      }),
      ...(icon && { icon }),
      ...(color && { color })
    },
    include: {
      milestones: true
    }
  })

  return goal
})