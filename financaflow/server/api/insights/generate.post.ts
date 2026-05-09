export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  const config = useRuntimeConfig()

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const budget = await prisma.budget.findUnique({
    where: { month_year: { month: currentMonth, year: currentYear } },
    include: {
      categories: {
        include: { expenses: true }
      }
    }
  })

  const goals = await prisma.goal.findMany({
    where: { isCompleted: false },
    include: { milestones: true }
  })

  const recentExpenses = await prisma.expense.findMany({
    take: 20,
    orderBy: { date: 'desc' },
    include: { category: true }
  })

  if (!budget && goals.length === 0) {
    return { content: 'Afegeix alguns pressupostos i objectius per rebre recomanacions personalitzades!', type: 'info' }
  }

  const totalBudget = budget?.categories.reduce((sum, cat) => sum + cat.limit, 0) || 0
  const totalSpent = budget?.categories.reduce((sum, cat) => 
    sum + cat.expenses.reduce((s, e) => s + e.amount, 0), 0) || 0
  
  const categoryBreakdown = budget?.categories.map(cat => ({
    name: cat.name,
    icon: cat.icon,
    limit: cat.limit,
    spent: cat.expenses.reduce((s, e) => s + e.amount, 0),
    remaining: cat.limit - cat.expenses.reduce((s, e) => s + e.amount, 0)
  })) || []

  const goalsProgress = goals.map(g => ({
    name: g.name,
    icon: g.icon,
    current: g.currentAmount,
    target: g.targetAmount,
    percentage: Math.round((g.currentAmount / g.targetAmount) * 100)
  }))

  const financialContext = `
Pressupost actual: ${totalBudget}€ total, ${totalSpent}€ gastats (${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%)
Categories: ${categoryBreakdown.map(c => `${c.name} (${c.icon}): ${c.spent}/${c.limit}€ - ${c.remaining > 0 ? `${c.remaining}€ restants` : `${Math.abs(c.remaining)}€ excedit`}`).join('; ') || 'Cap'}
Objectius d'estalvi: ${goalsProgress.map(g => `${g.name} ${g.icon}: ${g.current}/${g.target}€ (${g.percentage}%)`).join('; ') || 'Cap'}
Despeses recents: ${recentExpenses.slice(0, 5).map(e => `${e.description || 'Sense descripció'}: ${e.amount}€`).join('; ') || 'Cap'}
  `.trim()

  const prompt = `Analitza les dades financeres següents i genera una recomanació breu i útil en català (màxim 2-3 frases):

${financialContext}

La recomanació hauria de ser práctica, específica basada en les dades, i útil per a l'usuari.`

  try {
    const response = await $fetch<{ message: { content: string } }>(`${config.public.ollamaUrl}/api/generate`, {
      method: 'POST',
      body: {
        model: 'llama3.1',
        prompt,
        stream: false
      },
      timeout: 60000
    })

    const insight = await prisma.insight.create({
      data: {
        type: 'financial',
        content: response.message.content
      }
    })

    await prisma.insight.deleteMany({
      where: {
        id: { not: insight.id }
      }
    })

    return insight
  } catch (error: any) {
    console.error('Failed to generate insight:', error)
    return { content: 'No s\'han pogut generar recomanacions ara. Torna més tard!', type: 'error' }
  }
})