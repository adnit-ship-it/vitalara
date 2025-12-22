<script setup lang="ts">
import { computed } from 'vue'
import { resolveColorToken, resolveIconColor } from '~/utils/colorTokens'
import type { ExtractedSectionData } from '~/utils/sectionDataExtractor'

const props = defineProps<{
  sectionData?: ExtractedSectionData | null
}>()

// Section-driven heading (JSON is the source of truth, with simple hard-coded fallback)
const heading = computed(() => {
  if (props.sectionData?.heading) {
    return props.sectionData.heading
  }

  return {
    text: 'Your Satisfaction Is Our Priority',
    color: 'bodyColor',
    show: true,
  }
})

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

// Bullet points: driven by section data
const bulletPoints = computed(() => {
  if (props.sectionData?.bulletPoints) {
    return props.sectionData.bulletPoints
  }

  return null
})

const bulletItems = computed(() => bulletPoints.value?.items || [])

const bulletIconSrc = computed(
  () => bulletPoints.value?.icon?.src || '/assets/images/checkmark-star.svg'
)

const bulletIconColor = computed(() => {
  const token = bulletPoints.value?.icon?.color || '#337168'
  return resolveIconColor(token)
})

// Info cards: support & providers from section data
const supportCard = computed(() => {
  if (props.sectionData?.infoCard) {
    return props.sectionData.infoCard
  }

  return null
})

const providersCard = computed(() => {
  if (props.sectionData?.['infoCard with bulletpoint']) {
    return props.sectionData['infoCard with bulletpoint']
  }

  return null
})

const providersBulletText = computed(() => {
  const fromSection = providersCard.value?.bulletpoints?.[0]?.text
  if (fromSection) return fromSection

  return 'Certified doctors and clinicians'
})

const providersBulletIconSrc = computed(
  () => providersCard.value?.bulletpointIcon?.src || '/assets/images/checkmark-star.svg'
)

const providersBulletIconColor = computed(() => {
  const token = providersCard.value?.bulletpointIcon?.color || '#337168'
  return resolveIconColor(token)
})
</script>

<template>
  <UiSectionWrapper class="pb-8 md:py-20 py-6 md:pt-2">
    <UiSectionContainer class="flex pt-20 flex-col items-center">
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
            delay: 100,
          },
        }"
        :class="[
          'text-[20px] lg:text-[48px] w-full text-center font-semibold',
          headingColorClass,
        ]"
        :style="headingColorStyle"
      >
        {{
          heading?.text || 'Your Satisfaction Is Our Priority'
        }}
      </h2>
      <div
        class="mt-6 lg:mt-10 flex flex-col md:flex-row gap-4 md:justify-between w-full px-8 lg:px-0"
      >
        <div
          v-for="(item, index) in bulletItems"
          :key="index"
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
              delay: 150 + index * 50,
            },
          }"
          class="flex flex-row gap-2 items-center"
        >
          <UiIcon
            :icon-src="bulletIconSrc"
            :icon-color="bulletIconColor"
            size="28px"
            class="w-[28px] h-[28px]"
            alt="checkmark"
          />
          <p class="text-[16px] lg:text-[20px] font-medium">
            {{ item }}
          </p>
        </div>
      </div>
      <div
        class="pb-12 lg:pb-0 px-8 lg:px-0 mt-12 lg:mt-16 flex flex-col md:flex-row gap-8 justify-center md:justify-around w-full"
      >
        <div
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
              delay: 350,
            },
          }"
          class="flex flex-col items-center max-w-[400px]"
        >
          <h3
            class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-left md:text-center w-full"
          >
            {{ supportCard?.title || 'Unlimited 24/7 Support Included' }}
          </h3>
          <div class="h-0.5 w-10 bg-accentColor1 mt-0"></div>
          <p
            class="font-medium mt-4 tracking-tight w-full text-left md:text-center"
          >
            {{
              supportCard?.description ||
                'Medivora provides 24/7 access to a dedicated team of specialists, ensuring you have the support you need around the clock. With unlimited appointments, messaging and support, you can confidently reach out for guidance, ask questions, or address concerns at any time.'
            }}
          </p>
        </div>
        <div
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
              delay: 350,
            },
          }"
          class="flex flex-col items-center max-w-[400px]"
        >
          <h3
            class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-left md:text-center w-full"
          >
            {{ providersCard?.title || 'Hand Selected Providers' }}
          </h3>
          <div class="h-0.5 w-10 bg-accentColor1 mt-0"></div>
          <p class="font-medium mt-4 w-full text-left md:text-center">
            {{
              providersCard?.description ||
                'Medivora physicians are here to guide you every step of the way, bringing both their expertise and genuine care to keep you supported.'
            }}
          </p>
          <div
            class="flex flex-row gap-4 w-full justify-start md:justify-center items-center mt-2"
          >
            <UiIcon
              :icon-src="providersBulletIconSrc"
              :icon-color="providersBulletIconColor"
              size="28px"
              class="w-[28px] h-[28px] object-cover"
              alt="checkmark"
            />
            <p>{{ providersBulletText }}</p>
          </div>
        </div>
      </div>
    </UiSectionContainer>
  </UiSectionWrapper>
</template>