export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const response = await $fetch<{ status: string }>(`${config.public.ollamaUrl}/api/tags`, {
      timeout: 5000
    })
    return { status: 'online', models: response.models || [] }
  } catch (error) {
    return { status: 'offline', error: 'Ollama is not responding' }
  }
})