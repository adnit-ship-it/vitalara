<template>
  <div class="flex-col max-w-screen overflow-x-hidden bg-backgroundColor">
    <UiSectionWrapper>
      <UiSectionContainer class="py-20">
        <img v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            type: 'ease-in',
            stiffness: 250,
            damping: 25,
            mass: 1,
          },
        }" src="/assets/images/brand/logo-primary-1.svg" alt="brand logo"
          class="w-auto h-[48px] md:h-[64px] lg:h-[100px] object-cover" />
        <h1 v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
          opacity: 1,
          y: 0,
          transition: {
            duration: 400,
            type: 'ease-in',
            stiffness: 250,
            damping: 25,
            mass: 1,
            delay: 25,
          },
        }" class="text-[32px] md:text-[48px] font-semibold mt-2 md:mt-4 lg:mt-8">
          {{ page?.pageTitle || 'Explore Our Products' }}
        </h1>
        <p v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
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
        }" class="text-[16px] md:text-[23px] font-extralight mt-2">
          {{ page?.subtitle || 'Personalized GLP-1 Medication' }}
        </p>
        <div class="h-4 md:h-8"></div>
        <div class="flex gap-4 flex-wrap">
          <!-- Always show "All" button -->
          <UiButton 
            @click="selectedCategory = 'all'"
            :ghost="selectedCategory !== 'all'"
            v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 400,
                type: 'ease-in',
                stiffness: 250,
                damping: 25,
                mass: 1,
                delay: 75,
              },
            }" :width="buttonWidth" :height="buttonHeight" :font-size="buttonFontSize" background-color="accentColor2">
            All
          </UiButton>
          
          <!-- Dynamically render category buttons only for categories that have products -->
          <UiButton 
            v-for="category in availableCategories"
            :key="category"
            @click="selectedCategory = category"
            :ghost="selectedCategory !== category"
            v-motion :initial="{ opacity: 0, y: 100 }" :visible-once="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 400,
                type: 'ease-in',
                stiffness: 250,
                damping: 25,
                mass: 1,
                delay: 75,
              },
            }" :width="buttonWidth" :height="buttonHeight" :font-size="buttonFontSize" background-color="accentColor2">
            {{ categoryLabels[category] || category }}
          </UiButton>
        </div>
      </UiSectionContainer>
    </UiSectionWrapper>

    <FeaturesDiscover :products="filteredProducts" />
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import pagesConfig from '~/data/pages.json';
import { products, getAvailableCategories, categoryLabels } from '~/data/intake-form/products';

// Page copy from pages.json (products section)
const page = computed(() => pagesConfig.products || null);

// Category filter state - defaults to 'all'
const selectedCategory = ref('all');

// Get available categories (only categories that have products)
const availableCategories = computed(() => getAvailableCategories());

// Filter products based on selected category
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products; // Show all products
  }
  return products.filter(product => product.category === selectedCategory.value);
});

// Mobile detection
const isMobile = ref(false);

// Check mobile on mount and resize
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// Derived button sizes
const buttonWidth = computed(() => (isMobile.value ? "144px" : "320px"));
const buttonHeight = computed(() => (isMobile.value ? "20px" : "44px"));
const buttonFontSize = computed(() => (isMobile.value ? "12" : "24"));

definePageMeta({
  layout: "products",
});
</script>

<style scoped>
/* Products page styles */
</style>
