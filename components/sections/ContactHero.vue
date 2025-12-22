<template>
  <section
    class="mx-auto bg-backgroundColor pt-28 flex flex-col items-center px-8 md:px-0"
  >
    <img
      v-motion
      :initial="{ opacity: 0, y: 32 }"
      :visible-once="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 400,
          type: 'ease-in',
          stiffness: 250,
          damping: 25,
          mass: 1,
        },
      }"
      :src="logoSrc"
      :alt="logoAlt"
      class="w-auto object-cover"
      :style="{ height: logoHeight }"
    />
    <h2
      v-motion
      :initial="{ opacity: 0, y: 32 }"
      :visible-once="{
        opacity: 1,
        y: 0,
        transition: {
          duration: 400,
          type: 'ease-in',
          stiffness: 250,
          damping: 25,
          mass: 1,
          delay: 50,
        },
      }"
      class="text-[24px] md:text-[32px] font-semibold text-center mt-6 md:mt-12 px-12"
    >
      {{ titleText }}
    </h2>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { ExtractedSectionData } from '~/utils/sectionDataExtractor'
import { getLogoSize } from '~/utils/branding'

const props = defineProps<{
  sectionData?: ExtractedSectionData | null
}>()

// Responsive detection
const isMobile = ref(false)

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 1024
  }
}

onMounted(() => {
  checkScreenSize()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', checkScreenSize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkScreenSize)
  }
})

// Logo configuration from sections.json + logoSizes.contact in pages.json
const logoSrc = computed(
  () => props.sectionData?.logo?.src || '/assets/images/brand/logo-secondary-1.svg'
)

const logoAlt = computed(
  () => props.sectionData?.logo?.alt || 'Brand logo'
)

// Height always comes from logoSizes.contact in data/pages.json
const logoHeight = computed(() =>
  getLogoSize('contact', 'height', isMobile.value, false)
)

const titleText = computed(
  () =>
    props.sectionData?.heading?.text ||
    'Contact Us: Fill out the form and hear back from us'
)
</script>

<style scoped>
/* Component styles */
</style>

