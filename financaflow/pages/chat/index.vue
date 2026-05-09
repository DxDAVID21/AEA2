<template>
  <div class="chat-page page">
    <div class="chat-container">
      <div class="chat-header">
        <h1>Assistent IA</h1>
        <div class="connection-status" :class="connectionStatus">
          {{ connectionStatus === 'online' ? '🟢 Connectat' : '🟠 Desconnectat' }}
        </div>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="chat-empty">
          <div class="empty-icon">💬</div>
          <p>Hola! Soc el teu assistent financer personal.</p>
          <p>Pots preguntar-me sobre:</p>
          <ul>
            <li>Anàlisi del teu pressupost</li>
            <li>Consells per estalviar</li>
            <li>Planificació d'objectius</li>
            <li>Conceptes financers</li>
          </ul>
        </div>

        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role]"
        >
          <div class="message-avatar">
            {{ msg.role === 'user' ? '👤' : '🤖' }}
          </div>
          <div class="message-content">
            {{ msg.content }}
          </div>
        </div>

        <div v-if="isLoading" class="message assistant loading">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <span class="typing-dots">...</span>
          </div>
        </div>
      </div>

      <div v-if="messages.length === 0 && !isLoading" class="suggestions">
        <p class="suggestions-label">Preguntes sugerides:</p>
        <div class="suggestions-list">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion"
            class="suggestion-chip"
            @click="sendSuggestion(suggestion)"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <form class="chat-input" @submit.prevent="handleSend">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Escriu el teu missatge..."
          :disabled="isLoading"
        />
        <button type="submit" :disabled="!inputMessage.trim() || isLoading">
          <span>➤</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messagesContainer = ref<HTMLElement | null>(null)
const inputMessage = ref('')
const isLoading = ref(false)
const connectionStatus = ref<'online' | 'offline' | 'checking'>('checking')

const messages = ref<Message[]>([])

const suggestions = [
  'Com puc estalviar més aquest mes?',
  'Analitza les meves despeses',
  'Quins objectius hauria de posar?',
  'Com puc reduir les despeses?',
  'Quina és la meva situació financera?'
]

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const checkConnection = async () => {
  try {
    const status = await $fetch<{ status: string }>('/api/chat/health')
    connectionStatus.value = status.status === 'online' ? 'online' : 'offline'
  } catch {
    connectionStatus.value = 'offline'
  }
}

const handleSend = async () => {
  const message = inputMessage.value.trim()
  if (!message || isLoading.value) return

  messages.value.push({ role: 'user', content: message })
  inputMessage.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const response = await $fetch<{ content: string }>('/api/chat', {
      method: 'POST',
      body: {
        messages: messages.value.map(m => ({ role: m.role, content: m.content }))
      }
    })
    messages.value.push({ role: 'assistant', content: response.content })
  } catch (error: any) {
    messages.value.push({ 
      role: 'assistant', 
      content: error.data?.message || 'Ho sento, no he pogut respondre. Pots provar més tard?' 
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const sendSuggestion = (suggestion: string) => {
  inputMessage.value = suggestion
  handleSend()
}

onMounted(() => {
  checkConnection()
})
</script>

<style scoped>
.chat-page {
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .chat-page {
    height: calc(100vh - 120px);
  }
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
}

.chat-header h1 {
  font-size: 1.25rem;
  margin: 0;
}

.connection-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.connection-status.online {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
}

.connection-status.offline {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-empty {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.chat-empty ul {
  text-align: left;
  display: inline-block;
  margin-top: 1rem;
}

.chat-empty li {
  text-align: left;
  margin: 0.5rem 0;
}

.message {
  display: flex;
  gap: 0.75rem;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.assistant {
  align-self: flex-start;
}

.message-avatar {
  width: 36px;
  height: 36px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: var(--color-primary);
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  line-height: 1.5;
}

.message.user .message-content {
  background: var(--color-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: var(--bg-primary);
  border-bottom-left-radius: 4px;
}

.message.loading .message-content {
  color: var(--text-muted);
  font-style: italic;
}

.typing-dots {
  animation: typing 1s infinite;
}

@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.suggestions {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-primary);
}

.suggestions-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0 0 0.5rem 0;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.suggestion-chip {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.suggestion-chip:hover {
  background: var(--bg-tertiary);
  border-color: var(--color-primary);
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.chat-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.chat-input input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.chat-input button {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-lg);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.chat-input button:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>