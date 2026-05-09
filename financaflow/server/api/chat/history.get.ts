export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const messages = await prisma.chatMessage.findMany({
    orderBy: { createdAt: 'asc' },
    take: 50
  })

  return messages
})