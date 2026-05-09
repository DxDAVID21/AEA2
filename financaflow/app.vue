<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ChatWidget />
  <Notifications />
</template>

<script setup lang="ts">
import '~/assets/css/main.css'

useHead({
  htmlAttrs: {
    lang: 'ca'
  }
})
</script>