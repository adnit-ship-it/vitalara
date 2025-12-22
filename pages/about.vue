<template>
  <div class="bg-backgroundColor max-w-screen overflow-x-hidden">
    <DynamicSection
      v-for="section in pageSections"
      :key="section.name"
      :section="section"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePagesStore } from '~/stores/pagesStore'

const pagesStore = usePagesStore()

// Load pages and sections data before rendering
await pagesStore.loadAll().catch((err) => {
  console.error('Failed to load pages/sections data for About page:', err)
})

// About page key in pages.json
const pageKey = 'about'

// Ordered sections for About page
const pageSections = computed(() => {
  return pagesStore.getPageSections(pageKey)
})
</script>

<style scoped>
/* About page styles */
</style>
