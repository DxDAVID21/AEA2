<template>
  <div class="insight-card">
    <div v-if="isLoading" class="insight-loading">
      <div class="skeleton" style="height: 60px;"></div>
    </div>
    <div v-else-if="insight" class="insight-content fade-in">
      <div class="insight-icon">💡</div>
      <div class="insight-text">{{ insight.content }}</div>
    </div>
    <div v-else class="insight-empty">
      <p>Afegeix dades per rebre recomanacions personalitzades!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true)
const insight = ref<{ content: string; type: string } | null>(null)

onMounted(async () => {
  try {
    const data = await $fetch<any>('/api/insights')
    if (data?.content) {
      insight.value = data
    } else {
      await generateInsight()
    }
  } catch (error) {
    console.error('Failed to fetch insight:', error)
  } finally {
    isLoading.value = false
  }
})

const generateInsight = async () => {
  try {
    const data = await $fetch<any>('/api/insights/generate', { method: 'POST' })
    if (data?.content) {
      insight.value = data
    }
  } catch (error) {
    console.error('Failed to generate insight:', error)
  }
}
</script>

<style scoped>
.insight-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--color-primary);
}

.insight-loading {
  padding: 0.5rem;
}

.insight-content {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.insight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.insight-text {
  color: var(--text-primary);
  line-height: 1.5;
}

.insight-empty {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>