<template>
  <footer
    class="bg-accentColor1 text-white flex flex-col items-center pb-4 footer-container"
  >
    <!-- Main row: Logo, line, navigation -->
    <div
      class="max-w-[1328px] w-full flex items-end justify-between md:justify-center px-4 md:px-8 md:gap-8"
    >
      <div class="flex items-center">
        <NuxtLink to="/">
          <div class="pb-1 footer-logo">
            <img
              src="/assets/images/brand/logo-secondary-1.svg"
              :alt="common?.accessibility?.brandLogo || 'Brand Logo'"
              class="h-full w-full"
            />
          </div>
        </NuxtLink>
      </div>
      <div class="md:block h-[1px] mb-1.5 w-full mx-2 md:mx-5 flex-1 bg-white"></div>

      <!-- Navigation buttons on the right -->
      <div class="flex items-center gap-x-2 md:gap-x-6">
        <NuxtLink
          to="/about"
          class="text-white text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200"
        >
          {{ common?.navigation?.about || 'About' }}
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="text-white text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200"
        >
          {{ common?.navigation?.contactUs || 'Contact Us' }}
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-white text-[14px] md:text-[18px] lg:text-[20px] transition-colors duration-200"
        >
          {{ common?.navigation?.products || 'Products' }}
        </NuxtLink>
      </div>
    </div>

    <!-- Legal links row: centered, smaller text -->
    <div v-if="legalStore.footerLinks.length" class="flex items-center gap-x-2 mt-1">
      <template v-for="(link, index) in legalStore.footerLinks" :key="link.id">
        <NuxtLink
          :to="`/legal/${link.slug}`"
          class="text-white/80 text-[10px] md:text-[12px] hover:text-white transition-colors duration-200"
        >
          {{ link.footerLabel }}
        </NuxtLink>
        <span v-if="index < legalStore.footerLinks.length - 1" class="text-white/60 text-[10px] md:text-[12px]">|</span>
      </template>
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted } from "vue";
import pagesConfig from "~/data/pages.json";
import { useLegalStore } from "~/stores/legalStore";

const common = computed(() => pagesConfig.common || null);
const legalStore = useLegalStore();

onMounted(() => {
  legalStore.loadLegal(true); // skipLoadingState = true
});
</script>

<style scoped>
/* Footer container - responsive height using CSS media queries */
.footer-container {
  height: 80px; /* mobile default - taller to fit two rows */
}

@media (min-width: 1024px) {
  .footer-container {
    height: 88px; /* desktop */
  }
}

/* Footer logo - responsive height using CSS media queries */
.footer-logo {
  height: 20px; /* mobile default */
}

@media (min-width: 768px) {
  .footer-logo {
    height: 26px; /* tablet */
  }
}

@media (min-width: 1024px) {
  .footer-logo {
    height: 32px; /* desktop */
  }
}
</style>
