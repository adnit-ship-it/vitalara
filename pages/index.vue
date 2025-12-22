<!-- <template>
  <div class="max-w-screen overflow-x-hidden">
    <SectionsHero />
    <SectionsMarquee :content="marqueeContent" />
    <FeaturesCTA title="Weight Loss" subtitle="GLP-1 Medication Options" image="/assets/images/weight-loss.png"
      :features="['Tirzepatide Tablets', 'Tirzepatide Injection', 'Tirzepatide Oral Drops']" />
    <FeaturesDiscover/>
    <FeaturesCTA reverse title="Skin Care" subtitle="Acne Medication Options"
      :features="['Topical Cream', 'Topical Spray', 'Topical Wipes']" image="/assets/images/skincare.png" />
    <FeaturesDiscover/>
    <FeaturesCTA title="Wellness Products" subtitle="Medication Options"
      :features="['B12 Injection', 'Glutathione Injection', 'Methylene Capsules']"
      image="/assets/images/skincare.png" />
    <SectionsTrustedBy center />
    <SectionsTestimonials />
    <SectionsJourney />
    <SectionsFeatures />
    <SectionsFAQ />
    <SectionsWeightLossGoal :content="weightLossGoalContent" />
  </div>
</template> -->
<template>
  <div class=" bg-backgroundColor max-w-screen overflow-x-hidden">
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

const route = useRoute()

// Load pages and sections data BEFORE rendering (SSR + first client render)
await pagesStore.loadAll().catch((err) => {
  console.error('Failed to load pages/sections data:', err)
})

// Get current page key from route
const pageKey = computed(() => {
  if (route.path === '/') return 'home'
  return route.path.slice(1) // Remove leading '/'
})

// Get ordered sections for this page
const pageSections = computed(() => {
  const sections = pagesStore.getPageSections(pageKey.value)
  return sections
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
