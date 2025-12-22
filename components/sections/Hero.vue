<template>
  <UiSectionWrapper class="relative text-black md:h-[960px]  pt-24 lg:pt-32 pb-52">
    <!-- Background Image -->
    <div
      v-if="media?.background?.src"
      class="absolute inset-0 bg-cover bg-no-repeat w-full h-full"
      :style="{
        backgroundImage: `url('${media?.background?.src}')`,
        backgroundPosition: 'bottom right'
      }"
    />

   

    <!-- Hand Vial Image - Bottom Right (mobile) -->
    <div
      class="absolute md:hidden bottom-8 right-0 z-20 flex items-end justify-end"
      :style="{ height: foregroundHeightMobile }"
      v-if="media?.foreground?.src && media?.foreground?.show !== false"
    >
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
            mass: 1
          }
        }"
        :src="media?.foreground?.src"
        :alt="media?.foreground?.alt"
        class="h-full w-auto object-contain"
      />
    </div>

    <!-- Content -->
    <UiSectionContainer class="relative z-30 h-full flex justify-between">
      <div class="space-y-2 md:space-y-4 lg:space-y-10 flex flex-col justify-center h-full">
        <!-- Logo -->
        <div
          v-if="logo?.show !== false"
          :style="{ height: logoHeight, width: logoWidth }"
        >
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
                mass: 1
              }
            }"
            :src="logo?.src"
            :alt="logo?.alt"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Heading -->
        <h1
          v-if="heading?.show !== false"
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
              delay: 50
            }
          }"
          :class="[
            'text-2xl md:text-3xl lg:text-[48px] font-bold',
            headingColorClass
          ]"
          :style="headingColorStyle"
        >
          {{ heading?.text }}
        </h1>

        <!-- Subheading -->
        <h2
          v-if="subheading?.show !== false"
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
              delay: 100
            }
          }"
          :class="[
            'text-lg md:text-xl lg:text-[34px]',
            subheadingColorClass
          ]"
          :style="subheadingColorStyle"
        >
          {{ subheading?.text }}
        </h2>

        <!-- Bullet Points -->
        <ul
          v-if="bulletPoints?.show !== false && bulletPointsItems.length > 0"
          class="space-y-4"
        >
          <li
            v-for="(item, index) in bulletPointsItems"
            :key="index"
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
                delay: 150 + index * 50
              }
            }"
            class="flex items-center h-[16px] md:h-[26px]"
          >
            <UiIcon
              :icon-src="bulletPointIconSrc"
              :icon-color="bulletPointIconColor"
              :size="isMobile ? '20px' : '26px'"
              class="mr-1 md:mr-3"
              alt="Checkmark"
            />
            <span
              :class="[
                'text-[16px] md:text-[20px] lg:text-[24px] font-medium',
                bulletPointTextColorClass
              ]"
            >
              {{ item }}
            </span>
          </li>
        </ul>

        <!-- CTA Button -->
        <div
          v-if="ctaButton?.show !== false"
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
              delay: 200
            }
          }"
          class="flex flex-col justify-end h-[50px] mt-7 lg:mt-5"
        >
          <NuxtLink to="/consultation">
            <UiButton
              :backgroundColor="ctaButtonBackgroundColor"
              :textColor="ctaButtonTextColor"
              :width="buttonWidth"
              :height="buttonHeight"
              :font-size="buttonFontSize"
            >
              {{ ctaButton?.text }}
            </UiButton>
          </NuxtLink>
        </div>
      </div>

      <!-- Foreground desktop -->
      <div
        v-if="media?.foreground?.src && media?.foreground?.show !== false"
        class="hidden md:block z-20"
        :style="{ height: foregroundHeightDesktop }"
      >
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
              mass: 1
            }
          }"
          :src="media?.foreground?.src"
          :alt="media?.foreground?.alt"
          class="h-full w-auto object-contain"
        />
      </div>
    </UiSectionContainer>
  </UiSectionWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { resolveColorToken, resolveIconColor } from "~/utils/colorTokens";
import { getLogoSize } from "~/utils/branding";

const props = defineProps<{
  sectionData: any | null;
}>();

// Extract data from sectionData (no text fallbacks – JSON is the source of truth)
const heading = computed(() => props.sectionData?.heading);
const subheading = computed(() => props.sectionData?.subheading);
const logo = computed(() => props.sectionData?.logo);
const media = computed(() => props.sectionData?.media);
const bulletPoints = computed(() => props.sectionData?.bulletPoints);
const ctaButton = computed(() => props.sectionData?.ctaButton);

// Bullet points
const bulletPointsItems = computed<string[]>(() => {
  return bulletPoints.value?.items || [];
});

const bulletPointIconSrc = computed(() => {
  return bulletPoints.value?.icon?.src || "/assets/images/brand/check-star.svg";
});

const bulletPointIconColor = computed(() => {
  const token = bulletPoints.value?.icon?.color || "accentColor2";
  return resolveIconColor(token);
});

// Responsive foreground heights
const foregroundHeightMobile = computed(() => {
  return media.value?.foreground?.sizes?.mobile || "222px";
});

const foregroundHeightTablet = computed(() => {
  return media.value?.foreground?.sizes?.tablet || "480px";
});

const foregroundHeightDesktop = computed(() => {
  if (!process.client) {
    return media.value?.foreground?.sizes?.desktop || "600px";
  }
  if (isMobile.value) return foregroundHeightMobile.value;
  if (window.innerWidth >= 1024) {
    return media.value?.foreground?.sizes?.desktop || "600px";
  }
  return foregroundHeightTablet.value;
});

// Mobile / tablet detection
const isMobile = ref(false);
const isTablet = ref(false);

const checkMobile = () => {
  if (!process.client) return;
  const width = window.innerWidth;
  isMobile.value = width < 768;
  isTablet.value = width >= 768 && width < 1024;
};

// Logo sizes from pages.json → logoSizes.hero
const logoHeight = computed(() =>
  getLogoSize("hero", "height", isMobile.value, isTablet.value)
);
const logoWidth = computed(() =>
  getLogoSize("hero", "width", isMobile.value, isTablet.value)
);

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  if (!process.client) return;
  window.removeEventListener("resize", checkMobile);
});

// CTA button sizes
const buttonWidth = computed(() => (isMobile.value ? "192px" : "320px"));
const buttonHeight = computed(() => (isMobile.value ? "28px" : "48px"));
const buttonFontSize = computed(() => (isMobile.value ? "16" : "24"));

// Color classes / styles
const headingColorClass = computed(() => {
  const token = heading.value?.color || "bodyColor";
  const resolved = resolveColorToken(token, "text");
  // If resolveColorToken returns a hex (for inline style), don't use it as a class
  return resolved.startsWith("#") ? "" : resolved;
});

const headingColorStyle = computed(() => {
  const token = heading.value?.color || "bodyColor";
  const resolved = resolveColorToken(token, "text");
  return resolved.startsWith("#") ? { color: resolved } : {};
});

const subheadingColorClass = computed(() => {
  const token = subheading.value?.color || "bodyColor";
  const resolved = resolveColorToken(token, "text");
  return resolved.startsWith("#") ? "" : resolved;
});

const subheadingColorStyle = computed(() => {
  const token = subheading.value?.color || "bodyColor";
  const resolved = resolveColorToken(token, "text");
  return resolved.startsWith("#") ? { color: resolved } : {};
});

const bulletPointTextColorClass = computed(() => {
  return resolveColorToken("accentColor1", "text");
});

// CTA button colors from JSON
const ctaButtonBackgroundColor = computed(() => {
  return ctaButton.value?.backgroundColor || "accentColor2";
});

const ctaButtonTextColor = computed(() => {
  return ctaButton.value?.color || "white";
});
</script>

<style scoped>
/* Custom styles if needed */
</style>