<template>
  <header class="header">
    <div class="header-content">
      <NuxtLink to="/" class="logo">
        <span class="logo-icon">💰</span>
        <span class="logo-text">FinançaFlow</span>
      </NuxtLink>
      <div class="header-actions">
        <button class="icon-btn" @click="toggleTheme" :title="theme === 'dark' ? 'Mode clar' : 'Mode fosc'">
          {{ theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
  text-decoration: none;
}

.logo:hover {
  text-decoration: none;
}

.logo-icon {
  font-size: 1.5rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-btn {
  background: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 1.25rem;
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast);
}

.icon-btn:hover {
  background: var(--bg-tertiary);
}
</style>