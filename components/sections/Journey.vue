<template>
  <div
    v-if="journey"
    class="mx-auto py-[56px] flex flex-col text-bodyColor items-center"
  >
    <!-- Heading -->
    <h2
      class="section-title text-center mb-16"
      :class="headingColorClass"
      :style="headingColorStyle"
    >
      {{ journey?.title || 'Your Weight Loss Journey' }}
    </h2>
    <div class="flex flex-row lg:flex-col items-center gap-4">
      <div
        class="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-[1144px] lg:mb-4 pb-12"
      >
        <template v-for="(step, index) in journey?.steps" :key="index">
          <UiIcon
            :icon-src="step?.icon?.src"
            :icon-color="step?.icon?.color || '#A75809'"
            :size="'48px'"
            :alt="step?.icon?.alt || 'step icon'"
            class="md:w-16 md:h-16"
          />
          <div
            v-if="index < (journey?.steps?.length - 1)"
            class="w-0.5 lg:w-[180px] h-[72px] lg:h-0.5"
            :style="{ backgroundColor: progressLineColor }"
          ></div>
        </template>
      </div>
      <div
        class="w-full flex flex-col lg:flex-row items-start lg:items-center justify-center gap-16 lg:gap-[44px] mb-12"
      >
        <div
          v-for="(step, index) in journey?.steps"
          :key="index"
          class="flex flex-col lg:items-center w-[240px]"
        >
          <h3 class="text-[24px]">{{ step?.title || '' }}</h3>
          <p class="text-[20px] text-[#787878] font-light lg:text-center">
            <template v-for="(line, lineIndex) in step?.subtext" :key="lineIndex">
              {{ line }}<br v-if="lineIndex < (step?.subtext?.length - 1)" />
            </template>
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <NuxtLink to="/consultation">
        <UiButton
          height="44px"
          width="240px"
          fontSize="24"
          :backgroundColor="ctaButtonBackgroundColor"
          :textColor="ctaButtonTextColor"
        >
          {{ journey?.ctaButton || 'Start Today!' }}
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { resolveIconColor, resolveColorToken } from '~/utils/colorTokens'

// When rendered via DynamicSection, `sectionData` comes from sections.json
// and is already normalized by `extractSectionData`.
const props = defineProps({
  sectionData: {
    type: Object,
    default: null,
  },
})

const normalizeSubtext = (subtext) => {
  if (!subtext) return []
  if (Array.isArray(subtext)) return subtext
  // Support newline-separated strings from JSON
  return String(subtext).split('\n')
}

// Journey view-model driven entirely by data/sections.json
const journey = computed(() => {
  const data = props.sectionData
  if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
    return null
  }

  const steps = data.steps
    .slice()
    // Respect explicit order from sections.json
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((step) => ({
      title: step.title || '',
      subtext: normalizeSubtext(step.subtext),
      icon: {
        src: step.icon?.src || '',
        alt: step.icon?.alt || 'step icon',
        // Resolve hex or token (accentColor1, accentColor2, bodyColor, etc.)
        color: resolveIconColor(step.icon?.color || 'accentColor1'),
      },
    }))

  return {
    title: data.heading?.text || 'Your Weight Loss Journey',
    steps,
    ctaButton:
      data.button?.text ||
      data.ctaButton?.text ||
      'Start Today!',
    media: {
      progressLine: {
        // Progress line color also supports tokens or hex
        color: resolveIconColor(
          data.media?.progressLine?.color || '#A75809',
        ),
      },
    },
  }
})

const progressLineColor = computed(
  () => journey.value?.media?.progressLine?.color || '#A75809',
)

// Heading text color from sections.json (supports tokens & hex)
const headingColorClass = computed(() => {
  const token = props.sectionData?.heading?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? '' : resolved
})

const headingColorStyle = computed(() => {
  const token = props.sectionData?.heading?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})

// CTA button colors from sections.json (tokens only; use Tailwind color tokens)
const ctaButtonBackgroundColor = computed(() => {
  return (
    props.sectionData?.button?.backgroundColor ||
    'accentColor1'
  )
})

const ctaButtonTextColor = computed(() => {
  return (
    props.sectionData?.button?.color ||
    props.sectionData?.ctaButton?.color ||
    'white'
  )
})
</script>

<style scoped>
/* Component styles can be added here */
</style>
