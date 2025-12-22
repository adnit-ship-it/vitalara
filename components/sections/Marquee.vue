<template>
  <!-- Render only if we have features from sections.json -->
  <section v-if="features.length > 0" class="w-full">
    <!-- Desktop: Static layout -->
    <div
      class="hidden lg:flex h-[72px] w-full items-center justify-center gap-12"
      :style="{ backgroundColor }"
    >
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="flex gap-2 items-center text-white"
      >
        <UiIcon
          :icon-type="feature.iconType || 'checkmark-star'"
          :icon-color="getIconColor(feature.iconColor)"
          size="36px"
          :alt="`${feature.iconType} icon`"
        />
        <p class="font-medium text-[24px]">{{ feature.text }}</p>
      </div>
    </div>

    <!-- Mobile & Tablet: Infinite Marquee -->
    <div
      class="lg:hidden h-[48px] w-full overflow-hidden"
      :style="{ backgroundColor }"
    >
      <NuxtMarquee
        :speed="marqueeSpeed"
        :pause-on-hover="pauseOnHover"
        class="h-full"
      >
        <div class="flex mx-4 items-center gap-8 h-full">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="flex gap-2 items-center text-white whitespace-nowrap"
          >
            <UiIcon
              :icon-type="feature.iconType || 'checkmark-star'"
              :icon-color="getIconColor(feature.iconColor)"
              size="28px"
              :alt="`${feature.iconType} icon`"
            />
            <p class="font-medium text-lg">{{ feature.text }}</p>
          </div>
        </div>
      </NuxtMarquee>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveIconColor, isBaseColor } from '~/utils/colorTokens'

// DynamicSection passes this from sections.json via extractSectionData
const props = defineProps<{
  sectionData?: any | null
}>()

// For "Home Marquee" we have a single component block,
// kept in rawComponents[0] by sectionDataExtractor
const raw = computed(() => props.sectionData?.rawComponents?.[0] ?? null)

// Features array from sections.json (Home Marquee -> components[0].features)
const features = computed(() => raw.value?.features ?? [])

// Background color from sections.json (components[0].background.color)
// Supports both design tokens (e.g. "accentColor1", "backgroundColor")
// and raw CSS colors (e.g. "#337168", "blue").
const backgroundColor = computed(() => {
  const color = raw.value?.background?.color

  // Fallback to default accent color if not provided
  if (!color) return '#337168'

  // If this is a known base color token or extended token we support,
  // resolve it to a concrete hex value via the color token utilities.
  if (isBaseColor(color) || color === 'black' || color === 'white') {
    return resolveIconColor(color)
  }

  // Otherwise assume it's a valid CSS color (hex, rgb(), or named color)
  return color
})

// Marquee speed from normalized field (marqueeSpeed)
const marqueeSpeed = computed(
  () => props.sectionData?.marqueeSpeed ?? 30
)

// Pause-on-hover from raw component (marqueePauseOnHover)
const pauseOnHover = computed(() =>
  raw.value?.marqueePauseOnHover === false ? false : true
)

// Resolve token/hex/iconColor value to a concrete hex color for icons
const getIconColor = (token?: string) =>
  token ? resolveIconColor(token) : resolveIconColor('accentColor1')
</script>

<style scoped>
/* Component styles */
</style>