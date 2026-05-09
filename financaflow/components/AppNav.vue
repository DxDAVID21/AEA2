<template>
  <nav class="nav">
    <NuxtLink to="/" class="nav-item" active-class="active">
      <span class="nav-icon">📊</span>
      <span class="nav-label">Dashboard</span>
    </NuxtLink>
    <NuxtLink to="/budgets" class="nav-item" active-class="active">
      <span class="nav-icon">📋</span>
      <span class="nav-label">Pressupostos</span>
    </NuxtLink>
    <NuxtLink to="/expenses" class="nav-item" active-class="active">
      <span class="nav-icon">💸</span>
      <span class="nav-label">Despeses</span>
    </NuxtLink>
    <NuxtLink to="/goals" class="nav-item" active-class="active">
      <span class="nav-icon">🎯</span>
      <span class="nav-label">Objectius</span>
    </NuxtLink>
    <NuxtLink to="/chat" class="nav-item" active-class="active">
      <span class="nav-icon">💬</span>
      <span class="nav-label">Chat</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  z-index: 100;
}

@media (min-width: 768px) {
  .nav {
    position: static;
    border-top: none;
    background: var(--bg-primary);
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav-label {
    display: inline;
  }
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  min-width: 60px;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  text-decoration: none;
}

.nav-item.active {
  color: var(--color-primary);
  background: var(--bg-tertiary);
}

.nav-icon {
  font-size: 1.25rem;
}

.nav-label {
  font-size: 0.75rem;
  display: none;
}

@media (min-width: 768px) {
  .nav-item {
    flex-direction: row;
    padding: 0.75rem 1rem;
  }

  .nav-label {
    font-size: 0.875rem;
  }
}
</style>