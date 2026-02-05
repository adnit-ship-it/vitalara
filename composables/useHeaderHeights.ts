
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePagesStore } from '~/stores/pagesStore'

export function useHeaderHeights() {
  const pagesStore = usePagesStore()

  // Breakpoint detection (mobile-first defaults for SSR)
  const isMobile = ref(true)
  const isTablet = ref(false)

  // Update breakpoints based on window width
  const updateBreakpoints = () => {
    if (typeof window === 'undefined') return
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
  }

  // Get navbar height from common layout config
  const navbarHeight = computed(() => {
    const heights = pagesStore.pages?.common?.layout?.navbar?.height

    if (!heights) {
      // Fallback to fixed values if config not available
      return isMobile.value ? '83px' : '68px'
    }

    if (isMobile.value) return heights.mobile || '83px'
    if (isTablet.value) return heights.tablet || heights.desktop || '68px'
    return heights.desktop || '68px'
  })

  // Get announcement height (0px if disabled, fixed responsive values)
  const announcementHeight = computed(() => {
    if (!pagesStore.announcement?.enabled) return '0px'
    
    // Fixed heights: 60px mobile, 70px tablet, 80px desktop
    if (isMobile.value) return '60px'
    if (isTablet.value) return '70px'
    return '80px'
  })

  // Combined header offset
  const headerOffset = computed(() => {
    return `calc(${navbarHeight.value} + ${announcementHeight.value})`
  })

  // CSS variables object for :style binding on root element
  const cssVariables = computed(() => ({
    '--navbar-height': navbarHeight.value,
    '--announcement-height': announcementHeight.value,
    '--header-offset': headerOffset.value
  }))

  // Setup resize listener
  onMounted(() => {
    updateBreakpoints()
    window.addEventListener('resize', updateBreakpoints)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateBreakpoints)
    }
  })

  return {
    isMobile,
    isTablet,
    navbarHeight,
    announcementHeight,
    headerOffset,
    cssVariables,
    updateBreakpoints
  }
}