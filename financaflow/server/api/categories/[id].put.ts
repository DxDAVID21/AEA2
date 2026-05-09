export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  const body = await readBody(event)
  const { name, limit, color, icon } = body

  const category = await prisma.category.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(limit !== undefined && { limit }),
      ...(color && { color }),
      ...(icon && { icon })
    }
  })

  return category
})