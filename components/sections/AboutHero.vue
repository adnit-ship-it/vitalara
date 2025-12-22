<template>
  <section v-if="content?.show" class="pt-24 pb-16 md:py-28 flex-col bg-backgroundColor">
    <UiSectionWrapper>
      <UiSectionContainer class="pt-0">
        <div class="w-full min-h-[640px] flex flex-col items-center gap-4 pt-8 lg:pt-12">
          <!-- Logo -->
          <img 
            v-motion 
            :initial="{ opacity: 0, y: 100 }" 
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 500,
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
          
          <!-- Content -->
          <div class="w-full flex flex-col lg:flex-row gap-8 items-center">
            <div class="flex-1 h-full flex flex-col gap-2 lg:gap-6 pl-4 lg:pl-24">
              <h1 
                v-motion 
                :initial="{ opacity: 0, y: 100 }" 
                :visible-once="{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 500,
                    type: 'ease-in',
                    stiffness: 250,
                    damping: 25,
                    mass: 1,
                    delay: 50,
                  },
                }" 
                class="font-semibold text-[32px] lg:text-[48px] text-accentColor1 mb-2 lg:mb-4"
              >
                {{ content?.title || 'About Us' }}
              </h1>
              <h2 
                v-motion 
                :initial="{ opacity: 0, y: 100 }" 
                :visible-once="{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 500,
                    type: 'ease-in',
                    stiffness: 250,
                    damping: 25,
                    mass: 1,
                    delay: 100,
                  },
                }" 
                class="font-semibold text-[24px] lg:text-[34px]"
              >
                {{ content?.subtitle || 'Quality is our guarantee!' }}
              </h2>
              <p 
                v-motion 
                :initial="{ opacity: 0, y: 100 }" 
                :visible-once="{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 500,
                    type: 'ease-in',
                    stiffness: 250,
                    damping: 25,
                    mass: 1,
                    delay: 150,
                  },
                }" 
                class="text-[24px] lg:text-[34px] font-light"
              >
                {{ content?.description || 'Medivora works to change the game in the health and wellness space allowing for certified medical care, made simple and effective.' }}
              </p>
            </div>
            <div class="w-[320px] lg:min-w-[480px] h-full">
              <img 
                v-motion 
                :initial="{ opacity: 0, y: 100 }" 
                :visible-once="{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 500,
                    type: 'ease-in',
                    stiffness: 250,
                    damping: 25,
                    mass: 1,
                    delay: 0,
                  },
                }" 
                :src="imageSrc" 
                :alt="imageAlt" 
                class="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </UiSectionContainer>
    </UiSectionWrapper>
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
const isTablet = ref(false)

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
    isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024
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

// Logo configuration from sections.json + logoSizes.hero in pages.json
const logoSrc = computed(
  () => props.sectionData?.logo?.src || '/assets/images/brand/logo-secondary-1.svg'
)

const logoAlt = computed(
  () => props.sectionData?.logo?.alt || 'Brand logo'
)

// Use shared hero logo sizes so dimensions are consistent across pages
const logoHeight = computed(() =>
  getLogoSize('hero', 'height', isMobile.value, isTablet.value)
)

// Image configuration
const imageSrc = computed(
  () => props.sectionData?.media?.image?.src || '/assets/images/products.png'
)

const imageAlt = computed(
  () => props.sectionData?.media?.image?.alt || 'Products'
)
</script>

<style scoped>
/* Component styles */
</style>

