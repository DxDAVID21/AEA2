export default defineEventHandler(async (event) => {
  const prisma = usePrisma(event)
  const config = useRuntimeConfig()
  
  const body = await readBody(event)
  const { messages, context } = body

  if (!messages || !Array.isArray(messages)) {
    throw createError({ statusCode: 400, message: 'messages array is required' })
  }

  const systemPrompt = `Ets un assistent financer personal en català. Ajudes l'usuari a:
- Entendre els seus patrons de despesa
- Planificar pressupostos i objectius d'estalvi
- Donar consells pràctics per millorar les finances personals
- Explicar conceptes financers de forma senzilla

Sigues amicable, professional i donès consells útils i concrets. Respon sempre en català.
${context ? `\n\nContext financer actual:\n${context}` : ''}`

  try {
    const response = await $fetch<{ message: { content: string } }>(`${config.public.ollamaUrl}/api/chat`, {
      method: 'POST',
      body: {
        model: 'llama3.1',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: false
      },
      timeout: 60000
    })

    const assistantMessage = await prisma.chatMessage.create({
      data: {
        role: 'assistant',
        content: response.message.content
      }
    })

    return { content: response.message.content }
  } catch (error: any) {
    console.error('Ollama error:', error)
    
    if (error.code === 'ECONNREFUSED') {
      throw createError({ 
        statusCode: 503, 
        message: 'AI assistant is temporarily unavailable. Please try again later.' 
      })
    }
    
    throw createError({ 
      statusCode: 500, 
      message: 'Failed to get response from AI assistant' 
    })
  }
})