<template>
  <div class="min-h-screen bg-white flex flex-col" :style="cssVariables">
    <LayoutAnnouncementBar />
    <LayoutNavbar color="bg-accentColor1" />
    <main class="flex-1" :style="{ paddingTop: 'var(--header-offset)' }">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import { useHeaderHeights } from '~/composables/useHeaderHeights'

// Products layout - shows full navigation including logo and Get Started button
const { cssVariables } = useHeaderHeights()
</script>
