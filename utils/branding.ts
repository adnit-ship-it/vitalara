import { useBrandingStore } from '~/stores/branding'
import { computed } from "vue";
import pagesConfig from "~/data/pages.json";
/**
 * Utility function to get dynamic brand colors from the API
 * Falls back to static design tokens if branding is not loaded
 */
export function useBrandColors() {
  const brandingStore = useBrandingStore()
  
  const getBrandColors = () => {
    const brandColors = brandingStore.getBrandColors()
    
    if (brandColors) {
      return {
        backgroundColor: brandColors.background,
        bodyColor: brandColors.body,
        accentColor1: brandColors.accent1,
        accentColor2: brandColors.accent2,
      }
    }
    
    // Fallback to static design tokens
    return {
      backgroundColor: '#FDFAF6',
      bodyColor: '#000000',
      accentColor1: '#A75809',
      accentColor2: '#F8F2EC',
    }
  }
  
  return {
    getBrandColors,
    isBrandingLoaded: computed(() => !!brandingStore.branding)
  }
}

/**
 * Utility function to get brand logos from the API
 */
export function useBrandLogos() {
  const brandingStore = useBrandingStore()
  
  return {
    logoUrl: computed(() => brandingStore.getLogoUrl()),
    altLogoUrl: computed(() => brandingStore.getAltLogoUrl()),
    organizationName: computed(() => brandingStore.getOrganizationName()),
    isBrandingLoaded: computed(() => !!brandingStore.branding)
  }
}

type LogoSectionKey =
  | "hero"
  | "navbar"
  | "footer"
  | "contact"
  | "products"
  | "loadingScreen"

type LogoDimension = "height" | "width"

type ViewportSizeConfig = {
  mobile?: string
  tablet?: string
  desktop?: string
}

export function getLogoSize(
  sectionKey: LogoSectionKey,
  dimension: LogoDimension,
  isMobile: boolean,
  isTablet: boolean
): string {
  const logoSizes = (pagesConfig as any).logoSizes || {}
  const sectionSizes = logoSizes[sectionKey]
  if (!sectionSizes || !sectionSizes[dimension]) {
    return dimension === "height" ? "24px" : "auto"
  }

  const dimConfig = sectionSizes[dimension] as ViewportSizeConfig

  if (isMobile) return dimConfig.mobile || "24px"
  if (isTablet && dimConfig.tablet) return dimConfig.tablet
  return dimConfig.desktop || "32px"
}

/**
 * Navbar and footer heights from pages.json → common.layout
 * These are synchronous so they are available before mount.
 */
export function getNavbarHeightFromCommon(isMobile: boolean): string {
  const layout = (pagesConfig as any).common?.layout
  const heightConfig = layout?.navbar?.height as ViewportSizeConfig | undefined

  const mobile = heightConfig?.mobile || "83px"
  const desktop = heightConfig?.desktop || "68px"

  return isMobile ? mobile : desktop
}

export function getFooterHeightFromCommon(isMobile: boolean): string {
  const layout = (pagesConfig as any).common?.layout
  const heightConfig = layout?.footer?.height as ViewportSizeConfig | undefined

  const mobile = heightConfig?.mobile || "64px"
  const desktop = heightConfig?.desktop || "72px"

  return isMobile ? mobile : desktop
}

/**
 * Loading screen logo height from logoSizes.loadingScreen
 */
export function getLoadingScreenLogoHeight(isMobile: boolean): string {
  return getLogoSize("loadingScreen", "height", isMobile, false)
}