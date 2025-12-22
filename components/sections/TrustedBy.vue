<template>
  <div
    v-if="sectionData && sectionData.heading?.show !== false"
    class="mx-auto max-w-screen overflow-x-hidden pt-[60px]"
  >
    <!-- Heading -->
    <h2
      :class="[
        'section-title mb-2 md:mb-8',
        headingColorClass,
        center ? 'text-center' : 'pl-4 md:pl-20',
      ]"
      :style="headingColorStyle"
    >
      {{ sectionData.heading?.text || 'Trusted By' }}
    </h2>

    <!-- Mobile & Tablet: Marquee -->
    <div class="h-[96px] w-full border-y border-[#D9D9D9] overflow-hidden">
      <NuxtMarquee
        :speed="marqueeSpeed"
        :pause-on-hover="true"
        class="h-full"
      >
        <div class="flex items-center gap-8 lg:gap-16 h-full px-4">
          <template v-for="(logo, index) in logos" :key="index">
            <img
              v-for="n in 2"
              :key="`${index}-${n}`"
              :src="logo.src"
              :alt="logo.alt"
              class="h-8 lg:h-10 w-auto object-contain"
            />
          </template>
        </div>
      </NuxtMarquee>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveColorToken } from '~/utils/colorTokens'

// Props: `center` for alignment, `sectionData` from DynamicSection / sections.json
const props = defineProps({
  center: {
    type: Boolean,
    default: false,
  },
  sectionData: {
    type: Object,
    required: false,
    default: null,
  },
})

const heading = computed(() => props.sectionData?.heading || null)
const logos = computed(() => props.sectionData?.logos || [])
const marqueeSpeed = computed(
  () => props.sectionData?.marqueeSpeed ?? 20
)

const headingColorClass = computed(() => {
  const token = heading.value?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? '' : resolved
})

const headingColorStyle = computed(() => {
  const token = heading.value?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})

// Expose unwrapped sectionData for template convenience
const sectionData = computed(() => props.sectionData)
</script>

<style scoped>
/* Custom styles if needed */
</style>
