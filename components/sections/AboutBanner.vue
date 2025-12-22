<script setup lang="ts">
import { computed } from 'vue'
import { UiSectionWrapper } from '#components'
import { resolveColorToken } from '~/utils/colorTokens'
import type { ExtractedSectionData } from '~/utils/sectionDataExtractor'

const props = defineProps<{
  sectionData?: ExtractedSectionData | null
}>()

// Section-driven data (JSON is the source of truth, with simple hard-coded fallbacks)
const heading = computed(() => props.sectionData?.heading || null)
const subheading = computed(() => props.sectionData?.subheading || null)
const paragraph = computed(() => props.sectionData?.paragraph || null)
const media = computed(() => props.sectionData?.media || null)
const logo = computed(() => props.sectionData?.logo || null)

const logoSrc = computed(() => logo.value?.src || '/assets/images/brand/logo-secondary-1.svg')
const logoAlt = computed(() => logo.value?.alt || 'brand logo')

const heroImageSrc = computed(
  () => media.value?.image?.src || '/assets/images/products-alt.png'
)
const heroImageAlt = computed(
  () => media.value?.image?.alt || 'products'
)

// Heading / text colors from section data
const headingColorClass = computed(() => {
  const token = heading.value?.color || 'accentColor1'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? '' : resolved
})

const headingColorStyle = computed(() => {
  const token = heading.value?.color || 'accentColor1'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})

const subheadingColorClass = computed(() => {
  const token = subheading.value?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? '' : resolved
})

const subheadingColorStyle = computed(() => {
  const token = subheading.value?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})

const paragraphColorClass = computed(() => {
  const token = paragraph.value?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? '' : resolved
})

const paragraphColorStyle = computed(() => {
  const token = paragraph.value?.color || 'bodyColor'
  const resolved = resolveColorToken(token, 'text')
  return resolved.startsWith('#') ? { color: resolved } : {}
})
</script>

<template>
  <UiSectionWrapper class="py-20">
    <UiSectionContainer class="py-20">
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
        class="w-auto h-[48px] md:h-[64px] lg:h-[100px] object-cover mx-auto"
      />
      <div
        class="w-full flex flex-col md:flex-row gap-8 lg:gap-20 items-center mt-12 md:mt-6"
      >
        <div class="flex-1 h-full flex flex-col gap-2 lg:gap-6">
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
            :class="[
              'font-semibold text-[32px] lg:text-[48px] mb-2 lg:mb-4',
              headingColorClass,
            ]"
            :style="headingColorStyle"
          >
            {{ heading?.text || 'About Us' }}
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
            :class="[
              'font-semibold text-[24px] lg:text-[34px]',
              subheadingColorClass,
            ]"
            :style="subheadingColorStyle"
          >
            {{ subheading?.text || 'Quality is our guarantee!' }}
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
            :class="[
              'text-[24px] lg:text-[34px] font-light',
              paragraphColorClass,
            ]"
            :style="paragraphColorStyle"
          >
            {{
              paragraph?.text ||
                'Medivora works to change the game in the health and wellness space allowing for certified medical care, made simple and effective.'
            }}
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
            :src="heroImageSrc"
            :alt="heroImageAlt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </UiSectionContainer>
  </UiSectionWrapper>
</template>