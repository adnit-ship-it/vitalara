<template>
  <section
    class="w-full h-[448px] lg:h-[552px] min-w-screen bg-accentColor2 text-bodyColor flex relative gap-0"
    :class="isReversed ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'"
  >
    <div class="absolute bg-[#ebf2ee]/50 lg:bg-transparent top-0 left-0 w-full h-full flex justify-end">
      <div
        class="w-full max-w-[1280px] px-4 h-full md:px-8 mx-auto p-20 flex"
        :class="{ 'lg:justify-end': isReversed }"
      >
        <div class="flex flex-col w-fit">
          <h2
            v-if="showHeading"
            class="section-title"
            :class="headingColorClass"
            :style="headingColorStyle"
          >
            {{ displayTitle }}
          </h2>
          <div class="h-[3px] w-16 bg-accentColor1"></div>
          <p
            v-if="showSubheading"
            class="text-[24px] lg:text-[36px] font-light mt-4"
            :class="subheadingColorClass"
            :style="subheadingColorStyle"
          >
            {{ displaySubtitle }}
          </p>
          <div class="flex flex-col gap-4 lg:gap-7 mt-8">
            <UiButton
              v-for="feature in displayFeatures"
              :key="feature"
              height="44px"
              width="320px"
              fontSize="24"
              decorative
            >
              {{ feature }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block h-full min-w-[50%] flex-1 bg-[#EBF2EE] p-20">
    </div>
    <img
      v-if="displayImage"
      :src="displayImage"
      :alt="displayTitle ? `${displayTitle} image` : 'CTA image'"
      class="w-full h-full object-cover"
    />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { resolveColorToken } from '~/utils/colorTokens.ts'

// This component can be used in two ways:
// 1) Direct props (title, subtitle, image, features, reverse)
// 2) Data-driven via DynamicSection, which passes `sectionData` from sections.json
const props = defineProps({
  // Full section data coming from `DynamicSection` / sections.json
  sectionData: {
    type: Object,
    default: null,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  // When used directly you can pass an array of strings.
  // When used via sections.json, we read features from sectionData.rawComponents[0].features.
  features: {
    type: Array,
    default: () => [],
  },
})

// Prefer section-level `reverse` flag from sections.json if present
const isReversed = computed(() => {
  const firstComponent = props.sectionData?.rawComponents?.[0]
  if (typeof firstComponent?.reverse === 'boolean') {
    return firstComponent.reverse
  }
  return props.reverse
})

// Prefer explicit props, then fall back to sections.json heading/subheading
const displayTitle = computed(() => {
  if (props.title) return props.title
  return props.sectionData?.heading?.text || ''
})

const displaySubtitle = computed(() => {
  if (props.subtitle) return props.subtitle
  return props.sectionData?.subheading?.text || ''
})

// Respect heading/subheading `show` flags from sections.json
const showHeading = computed(() => {
  // When using direct props, show heading if there's a title
  if (props.title) return !!props.title

  const heading = props.sectionData?.heading
  if (!heading) {
    return !!displayTitle.value
  }

  return heading.show !== false
})

const showSubheading = computed(() => {
  // When using direct props, show subheading if there's a subtitle
  if (props.subtitle) return !!props.subtitle

  const subheading = props.sectionData?.subheading
  if (!subheading) {
    return !!displaySubtitle.value
  }

  return subheading.show !== false
})

// Resolve text colors from sections.json (fall back to bodyColor)
const headingColorClass = computed(() => {
  const token = props.sectionData?.heading?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  // If resolveColorToken returns a hex (for inline style), don't use it as a class
  return resolved.startsWith('#') ? '' : resolved
})

const headingColorStyle = computed(() => {
  const token = props.sectionData?.heading?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})

const subheadingColorClass = computed(() => {
  const token = props.sectionData?.subheading?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? '' : resolved
})

const subheadingColorStyle = computed(() => {
  const token = props.sectionData?.subheading?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})

// Prefer explicit image prop, then sections.json media.image.src
const displayImage = computed(() => {
  if (props.image) return props.image
  const mediaImage = props.sectionData?.media?.image
  // Respect image-level show flag
  if (mediaImage?.show === false) return ''
  if (mediaImage?.src) return mediaImage.src
  return ''
})

// Prefer explicit features prop, then sections.json raw component `features` array
const displayFeatures = computed(() => {
  if (Array.isArray(props.features) && props.features.length > 0) {
    return props.features
  }
  const firstComponent = props.sectionData?.rawComponents?.[0]
  if (Array.isArray(firstComponent?.features)) {
    return firstComponent.features
  }
  return []
})
</script>

<style scoped>
/* Component styles can be added here */
</style>
