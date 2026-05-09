<template>
  <div class="layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppNav />
  </div>
</template>

<script setup lang="ts">
const { theme, initTheme } = useTheme()
onMounted(() => {
  initTheme()
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding-bottom: 5rem;
}

@media (min-width: 768px) {
  .main {
    padding-bottom: 2rem;
  }
}
</style>