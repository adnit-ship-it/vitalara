<template>
  <nav :class="[
    'w-full fixed top-0 z-50 flex justify-center shadow-lg',
    props.color || 'bg-white'
  ]">
    <div v-motion :initial="{ opacity: 0.3, y: 8 }" :visible-once="{
      opacity: 1,
      y: 0,
      transition: {
        duration: 400,
        type: 'ease-in',
        stiffness: 250,
        damping: 25,
        mass: 1,
      },
    }" :class="[
      'lg:max-w-[1328px] w-full flex justify-center px-4 md:px-8 pb-2 md:pb-0',
      props.hideNavigation ? 'justify-center' : 'justify-between',
      'navbar-height',
    ]" :style="{ height: getNavbarHeight() }">
      <!-- Mobile hamburger menu on the left -->
      <button v-if="!props.hideNavigation" class="md:hidden rounded"
        :aria-label="common?.accessibility?.toggleMenu || 'Toggle mobile menu'" @click="toggleMobileMenu">
        <img src="/assets/images/hamburger-menu.svg" :alt="common?.accessibility?.menu || 'Menu'" class="h-4 w-4" />
      </button>

      <!-- Logo on center-->
      <div class="flex items-center">
        <NuxtLink to="/" class="cursor-pointer">
          <img 
            src="/assets/images/brand/logo-secondary-1.svg" 
            :alt="common?.accessibility?.brandLogo || 'Brand Logo'"
            class="w-auto navbar-logo"
            :style="{ height: getLogoHeight() }"
          />
        </NuxtLink>
      </div>
      <div class="flex items-center gap-10">

        <!-- Navigation links in middle -->
        <div v-if="!props.hideNavigation" class="hidden md:flex items-center gap-8">
          <NuxtLink to="/about">
            <p class="text-white text-lg font-medium">{{ common?.navigation?.about || 'About' }}</p>
          </NuxtLink>
          <NuxtLink to="/contact">
            <p class="text-white text-lg font-medium">{{ common?.navigation?.contact || 'Contact' }}</p>
          </NuxtLink>
          <NuxtLink to="/products">
            <p class="text-white text-lg font-medium">{{ common?.navigation?.product || 'Product' }}</p>
          </NuxtLink>
        </div>

        <!-- Get Started button on right -->
        <div v-if="!props.hideNavigation" class="flex flex-row items-center md:gap-3 relative">
          <NuxtLink to="/consultation">
            <UiButton background-color="white" text-color="accentColor1" width="176px" height="32px" font-size="20">
              {{ common?.buttons?.getStarted || 'Get Started' }}
            </UiButton>
          </NuxtLink>

          <!-- Mobile dropdown menu -->
          <div v-if="isMobileMenuOpen"
            class="lg:hidden absolute top-full right-36 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div class="py-2">
              <NuxtLink to="/about" class="block px-4 py-2 text-black text-lg font-medium hover:bg-gray-100"
                @click="closeMobileMenu">
                {{ common?.navigation?.about || 'About' }}
              </NuxtLink>
              <NuxtLink to="/contact" class="block px-4 py-2 text-black text-lg font-medium hover:bg-gray-100"
                @click="closeMobileMenu">
                {{ common?.navigation?.contact || 'Contact' }}
              </NuxtLink>
              <NuxtLink to="/products" class="block px-4 py-2 text-black text-lg font-medium hover:bg-gray-100"
                @click="closeMobileMenu">
                {{ common?.navigation?.product || 'Product' }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import pagesConfig from "~/data/pages.json";
import { getLogoSize, getNavbarHeightFromCommon } from "~/utils/branding";

const common = computed(() => pagesConfig.common || null);

// Define the color prop with a default value of 'bg-white'
const props = defineProps({
  color: {
    type: String,
    default: "bg-white",
  },
  hideNavigation: {
    type: Boolean,
    default: false,
  },
});

// Screen size detection
const isMobile = ref(false);
const isTablet = ref(false);

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768;
    isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024;
  }
};

const getNavbarHeight = () => {
  return getNavbarHeightFromCommon(isMobile.value);
};

const getLogoHeight = () => {
  return getLogoSize("navbar", "height", isMobile.value, isTablet.value);
};

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  // Don't interfere with NuxtLink navigation
  if (event.target.closest('a')) {
    return;
  }
  if (isMobileMenuOpen.value && !event.target.closest("nav")) {
    closeMobileMenu();
  }
};

// Add click outside listener
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  if (typeof window !== 'undefined') {
    window.removeEventListener("resize", checkScreenSize);
  }
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
