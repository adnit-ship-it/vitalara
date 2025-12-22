# Sections.json and Pages.json Architecture Preview

## Overview

This architecture separates **reusable sections** (`sections.json`) from **page configurations** (`pages.json`), allowing you to:
- Reuse sections across multiple pages
- Reorder sections by changing the `order` property
- Control page-specific layouts (navbar/footer heights, logos)
- Manage all content from JSON files

## File Structure

### `sections.json`
Contains all reusable sections that can be used across pages. Each section has:
- `id`: Unique identifier (e.g., "home-hero", "home-marquee")
- `type`: Component type (e.g., "hero", "marquee", "cta", "discover")
- `order`: Display order within the section registry (not page-specific)
- `content`: Section-specific configuration and data

**Section Types:**
- `hero`: Hero banners with heading, subheading, bullet points, CTA
- `marquee`: Scrolling feature marquee (extracted from index.vue)
- `cta`: Call-to-action sections with title, subtitle, image, features
- `discover`: Product discovery sections (uses products from `productsList.json`)
- `trustedBy`: Logo marquee section
- `testimonials`: Customer reviews section
- `journey`: Step-by-step journey visualization
- `features`: Statistics/features cards section
- `faq`: FAQ accordion section
- `intakeForm`: Simple intake form (title only, form logic unchanged)
- `aboutHero`: About page hero banner
- `aboutStats`: About page statistics/features
- `contactHero`: Contact page hero banner
- `productsHero`: Products page hero banner

### `pages.json`
Defines which sections appear on each page and their order. Contains:
- `iconRegistry`: Maps icon types to SVG paths
- `logoRegistry`: Maps logo types to image paths
- `pages`: Object mapping route paths to page configurations
  - Each page has:
    - `order`: Page order (for navigation)
    - `sections`: Array of section references with page-specific order
    - `layout`: Page-specific navbar/footer heights and logo heights
- `common`: Shared settings
  - `pageTitle`: Site title
  - `branding.loadingScreen.logo`: Loading screen logo (no fallbacks)
  - `layout`: Default layout settings (fallback for routes not in mapping)

## How They Connect

### 1. Page Rendering Flow

```
pages/index.vue
  ↓
Loads pages.json → Finds "/" page config
  ↓
Gets sections array: [{ sectionId: "home-hero", order: 1 }, ...]
  ↓
For each section, loads from sections.json by sectionId
  ↓
Renders components in order: Hero → Marquee → CTA → Discover → ...
```

### 2. Component Mapping

Each section `type` maps to a Vue component:
- `hero` → `components/sections/Hero.vue`
- `marquee` → `components/sections/Marquee.vue` (new component)
- `cta` → `components/features/CTA.vue`
- `discover` → `components/features/Discover.vue`
- `trustedBy` → `components/sections/TrustedBy.vue`
- `testimonials` → `components/sections/Testimonials.vue`
- `journey` → `components/sections/Journey.vue`
- `features` → `components/sections/Features.vue`
- `faq` → `components/sections/FAQ.vue`
- `intakeForm` → `components/sections/IntakeForm.vue` (new component)
- `aboutHero` → `components/sections/AboutHero.vue` (new component)
- `aboutStats` → `components/sections/AboutStats.vue` (new component)
- `contactHero` → `components/sections/ContactHero.vue` (new component)
- `productsHero` → `components/sections/ProductsHero.vue` (new component)

### 3. Data Flow Example

**Home Page (`/`):**
```json
{
  "sections": [
    { "sectionId": "home-hero", "order": 1 },
    { "sectionId": "home-marquee", "order": 2 }
  ]
}
```

1. Page loads `pages.json` → finds `/` config
2. Iterates through sections array in order
3. For each `sectionId`, loads section from `sections.json`
4. Renders corresponding component with section's `content` as props
5. Component uses `content` to display data

### 4. Layout Configuration

**Page-specific layouts:**
- Each page in `pages.json` can define its own `layout` object
- If a route is not in the mapping (e.g., `/checkout`), it falls back to `common.layout`
- Navbar/Footer components check: `pages[route.path]?.layout` → fallback to `common.layout`

**Logo configuration:**
- Same logo across pages, but heights change per page
- Logo paths come from `logoRegistry` in `pages.json`
- Heights come from page-specific `layout` or `common.layout`

### 5. Loading Screen Logo

- Source: `pages.json` → `common.branding.loadingScreen.logo`
- No fallbacks - must be defined in JSON
- Component: `components/GlobalLoadingScreen.vue` reads directly from this path

## Implementation Details

### Store Structure

The Pinia store (`stores/pagesStore.ts`) is responsible for:
1. Loading both `sections.json` and `pages.json`
2. Providing methods:
   - `getPageSections(pageKey)`: Returns ordered sections for a page
   - `getSectionData(sectionName)`: Returns section data by name
   - `navigationPages`: Returns pages for the navbar

### Page Component Structure

**Example: `pages/index.vue`**
```vue
<template>
  <div>
    <DynamicSection
      v-for="section in pageSections"
      :key="section.name"
      :section="section"
    />
  </div>
</template>

<script setup>
const route = useRoute()
const pagesStore = usePagesStore()

await pagesStore.loadAll()

const pageKey = computed(() => (route.path === '/' ? 'home' : route.path.slice(1)))
const pageSections = computed(() => pagesStore.getPageSections(pageKey.value))
</script>
```

### Section Component Props

Each section component receives its `content` object as props:
```vue
<script setup>
const props = defineProps<{
  content: {
    show: boolean
    // ... section-specific fields
  }
}>()
</script>
```

## Reordering Sections

To reorder sections on a page, simply change the `order` property in the `sections` array within `pages.json`:

```json
{
  "/": {
    "sections": [
      { "sectionId": "home-hero", "order": 1 },
      { "sectionId": "home-faq", "order": 2 },  // Moved FAQ to second
      { "sectionId": "home-marquee", "order": 3 }
    ]
  }
}
```

## Products Integration

- `discover` sections use `productsSource: "productsList"` to load from `data/intake-form/products.ts`
- Can filter by `category` (e.g., "weight-loss", "skincare", "all")
- Products are not duplicated in JSON - they come from the TypeScript file

## Questions for Clarification

1. **Marquee Component**: Should the marquee be a standalone section component, or should it be embedded within other sections?

2. **Intake Form**: You mentioned "lets only control the title of this component" - should the form fields come from a dedicated JSON file (e.g. `formContent.json`), or remain hardcoded in the component?

3. **Contact Form**: You said "dont change the form at all or hook it to a json" - so the contact form fields remain hardcoded, but the hero section should be configurable?

4. **Section Reuse**: Can the same section appear multiple times on the same page with different content? (e.g., multiple CTA sections with different titles)

5. **Products List**: Should `productsList.json` be created, or should we continue using `data/intake-form/products.ts`?

