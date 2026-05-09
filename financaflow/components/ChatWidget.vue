<template>
  <div class="chat-widget">
    <button v-if="!isOpen" class="chat-toggle" @click="isOpen = true" title="Obrir xat">
      💬
    </button>

    <div v-else class="chat-panel">
      <div class="chat-header">
        <span class="chat-title">Assistent IA</span>
        <button class="chat-close" @click="isOpen = false">✕</button>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="chat-empty">
          <p>Hola! Soc el teu assistent financer.</p>
          <p>Tens alguna pregunta sobre finances?</p>
        </div>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role]"
        >
          {{ msg.content }}
        </div>
        <div v-if="isLoading" class="message assistant loading">
          <span class="typing-indicator">Escrivint...</span>
        </div>
      </div>

      <div v-if="suggestions.length > 0 && messages.length === 0" class="chat-suggestions">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          class="suggestion-chip"
          @click="sendMessage(suggestion)"
        >
          {{ suggestion }}
        </button>
      </div>

      <form class="chat-input" @submit.prevent="handleSend">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="Escriu un missatge..."
          :disabled="isLoading"
        />
        <button type="submit" :disabled="!inputMessage.trim() || isLoading">
          ➤
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const inputMessage = ref('')
const isLoading = ref(false)
const messages = ref<Array<{ role: string; content: string }>>([])

const suggestions = [
  'Com puc estalviar més?',
  'Analitza les meves despeses',
  'Consells per al meu pressupost'
]

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
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
  } catch (error) {
    messages.value.push({ 
      role: 'assistant', 
      content: 'Ho sento, no he pogut respondre. Pots provar més tard?' 
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const sendMessage = (message: string) => {
  inputMessage.value = message
  handleSend()
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  z-index: 1000;
}

@media (min-width: 768px) {
  .chat-widget {
    bottom: 1rem;
    right: 1rem;
  }
}

.chat-toggle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary);
  border: none;
  font-size: 1.5rem;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-fast);
}

.chat-toggle:hover {
  transform: scale(1.1);
}

.chat-panel {
  width: 320px;
  height: 450px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 480px) {
  .chat-panel {
    width: calc(100vw - 2rem);
    height: calc(100vh - 8rem);
    position: fixed;
    left: 1rem;
    bottom: 6rem;
  }
}

.chat-header {
  background: var(--color-primary);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-weight: 600;
}

.chat-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chat-empty {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem 1rem;
}

.message {
  padding: 0.75rem;
  border-radius: var(--radius-md);
  max-width: 85%;
  animation: fade-in 0.2s ease;
}

.message.user {
  background: var(--color-primary);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.message.assistant {
  background: var(--bg-secondary);
  color: var(--text-primary);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.message.loading {
  color: var(--text-muted);
  font-style: italic;
}

.chat-suggestions {
  padding: 0.5rem 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-top: 1px solid var(--border-color);
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
  padding: 0.75rem;
  gap: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.chat-input input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.chat-input input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.chat-input button {
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  font-size: 1rem;
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