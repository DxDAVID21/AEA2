export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  
  const body = await readBody(event)
  const { role, content } = body

  if (!role || !content) {
    throw createError({ statusCode: 400, message: 'role and content are required' })
  }

  const message = await prisma.chatMessage.create({
    data: { role, content }
  })

  return message
})