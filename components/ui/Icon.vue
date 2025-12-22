<template>
  <span 
    v-if="iconHtml"
    class="inline-flex items-center justify-center icon-wrapper"
    :style="{ color: iconColor, width: size, height: size }"
    v-html="iconHtml"
  />
  <img 
    v-else
    :src="resolvedIconSrc" 
    :alt="alt"
    class="inline-block"
    :style="{ width: size, height: size }"
  />
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import pagesConfig from '~/data/pages.json'

const props = defineProps({
  iconType: {
    type: String,
    default: null
  },
  iconSrc: {
    type: String,
    default: null
  },
  iconColor: {
    type: String,
    default: 'currentColor'
  },
  size: {
    type: String,
    default: '20px'
  },
  alt: {
    type: String,
    default: 'Icon'
  }
})

const iconRegistry = computed(() => pagesConfig.iconRegistry || {})

const resolvedIconSrc = computed(() => {
  if (props.iconSrc) return props.iconSrc
  if (props.iconType && iconRegistry.value?.[props.iconType]?.path) {
    return iconRegistry.value[props.iconType].path
  }
  return '/assets/images/checkmark.svg'
})

const iconHtml = ref(null)

const loadIcon = async () => {
  try {
    const response = await fetch(resolvedIconSrc.value)
    const svgText = await response.text()
    iconHtml.value = svgText
  } catch (error) {
    console.error('Failed to load icon:', error)
  }
}

watch(() => resolvedIconSrc.value, () => {
  loadIcon()
}, { immediate: true })

onMounted(() => {
  loadIcon()
})
</script>

<style scoped>
.icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
  color: inherit;
}

/* Preserve explicit colors - white strokes should stay white */
.icon-wrapper :deep(path[stroke="white"]) {
  stroke: white !important;
}
</style>
