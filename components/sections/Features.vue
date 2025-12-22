<template>
  <!-- Original two-card layout, now driven by data/sections.json -->
  <div
    v-if="shouldRender"
    class="w-full flex flex-col lg:flex-row py-[136px] text-accentColor1 justify-center relative"
  >
    <!-- Centered Background Image -->
    <img
      v-if="backgroundImage?.src && backgroundImage?.show !== false"
      :src="backgroundImage.src"
      :alt="backgroundImage.alt"
      class="hidden lg:block absolute inset-0 m-auto w-auto h-[464px] pointer-events-none"
    />

    <!-- Left card (stat #1) -->
    <div
      v-if="firstStat"
      class="lg:w-[624px] h-[266px] bg-[#337168]/50 rounded-t-[44px] lg:rounded-l-[52px] py-10 px-6 lg:pl-14 mt-6"
    >
      <h2 class="text-[24px] font-semibold">
        {{ firstStat.value }}
      </h2>
      <div class="h-[3px] w-16 bg-accentColor1 my-2"></div>
      <p class="max-w-[382px] text-[16px] font-medium tracking-tighter">
        {{ firstStat.description }}
      </p>
    </div>

    <!-- Divider line (mobile only) -->
    <div
      v-if="firstStat && secondStat"
      class="pt-16 px-6 bg-[#337168]/50 lg:hidden"
    >
      <div class="h-[1px] w-full bg-accentColor1"></div>
    </div>

    <!-- Right card (stat #2) -->
    <div
      v-if="secondStat"
      class="lg:w-[624px] h-[266px] bg-[#337168]/50 rounded-b-[44px] lg:rounded-r-[52px] py-10 px-6 lg:pl-44 lg:-mt-6 pr-16"
    >
      <h2 class="text-[24px] font-semibold">
        {{ secondStat.value }}
      </h2>
      <div class="h-[3px] w-16 bg-accentColor1 my-2"></div>
      <p class="max-w-[382px] text-[16px] font-medium tracking-tighter">
        {{ secondStat.description }}
      </p>

      <!-- Bulletpoint with optional icon -->
      <div
        v-if="showSecondBulletpoint"
        class="flex gap-2 items-center mt-6"
      >
        <UiIcon
          :icon-src="secondIconSrc"
          :icon-color="secondIconColor"
          size="28px"
          :alt="secondIconAlt"
        />
        <p>{{ secondBulletText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveIconColor } from '~/utils/colorTokens'

const props = defineProps<{
  // Provided by DynamicSection via extractSectionData (data/sections.json)
  sectionData?: any | null
}>()

// All statistics from sections.json ("Home Features" -> components[0].statistics)
const allStats = computed(() => {
  const raw = props.sectionData?.statistics
  if (!Array.isArray(raw)) return []

  return raw
    .filter((stat: any) => stat && stat.show !== false)
    .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
})

// First and second cards
const firstStat = computed(() => allStats.value[0] ?? null)
const secondStat = computed(() => allStats.value[1] ?? null)

// Background image from sections.json (media.image)
const backgroundImage = computed(() => props.sectionData?.media?.image ?? null)

// Only render if we have at least one card or background image
const shouldRender = computed(() => {
  return Boolean(firstStat.value || secondStat.value || backgroundImage.value)
})

// Second card bulletpoint (icon + text)
const showSecondBulletpoint = computed(() => {
  const stat = secondStat.value
  if (!stat) return false

  // New flag: primary control for bulletpoint visibility
  if (stat.showBulletpoint === false) return false

  // Backwards compat: respect old showIcon === false only if showBulletpoint is undefined
  if (stat.showBulletpoint === undefined && stat.showIcon === false) return false

  // Only show if there's at least some content
  return Boolean(stat.icon?.src || stat.bulletpointText)
})

const secondIconSrc = computed(() => {
  return secondStat.value?.icon?.src || '/assets/images/checkmark-star.svg'
})

const secondIconAlt = computed(() => {
  return secondStat.value?.icon?.alt || 'checkmark'
})

const secondIconColor = computed(() => {
  const colorTokenOrHex = secondStat.value?.icon?.color || '#337168'
  return resolveIconColor(colorTokenOrHex)
})

const secondBulletText = computed(() => {
  // Optional future extension: allow bulletpointText in sections.json
  return secondStat.value?.bulletpointText || 'Certified doctors and clinicians'
})
</script>