export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { month, year, categories } = body

  if (!month || !year) {
    throw createError({ statusCode: 400, message: 'Month and year are required' })
  }

  try {
    const budget = await prisma.budget.upsert({
      where: { month_year: { month, year } },
      update: {
        categories: {
          create: categories?.map((cat: { name: string; limit: number; color?: string; icon?: string }) => ({
            name: cat.name,
            limit: cat.limit,
            color: cat.color || '#3B82F6',
            icon: cat.icon || '📁'
          })) || []
        }
      },
      create: {
        month,
        year,
        categories: {
          create: categories?.map((cat: { name: string; limit: number; color?: string; icon?: string }) => ({
            name: cat.name,
            limit: cat.limit,
            color: cat.color || '#3B82F6',
            icon: cat.icon || '📁'
          })) || []
        }
      },
      include: {
        categories: true
      }
    })

    return budget
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw createError({ 
        statusCode: 409, 
        message: 'Ja existeix un pressupost per a aquest mes i any' 
      })
    }
    throw error
  }
})