<template>
  <section v-if="content?.show" >
    <UiSectionWrapper class="pb-8 md:py-20 py-6 md:pt-2">
      <UiSectionContainer class="flex flex-col items-start">
        <h2 
          v-motion 
          :initial="{ opacity: 0, y: 32 }" 
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: {
              duration: 400,
              type: 'ease-in',
              stiffness: 250,
              damping: 25,
              mass: 1,
              delay: 100,
            },
          }" 
          class="text-[20px] lg:text-[32px] w-full text-center font-semibold"
        >
          {{ content?.title || 'Your Satisfaction Is Our Priority' }}
        </h2>

        <!-- Features row -->
        <div class="mt-6 lg:mt-10 flex flex-col md:flex-row gap-4 md:justify-between w-full px-8 lg:px-0">
          <div 
            v-for="(feature, index) in content?.features" 
            :key="index"
            v-motion 
            :initial="{ opacity: 0, y: 32 }" 
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 400,
                type: 'ease-in',
                stiffness: 250,
                damping: 25,
                mass: 1,
                delay: 150 + (index * 50),
              },
            }" 
            class="flex flex-row gap-2 items-center"
          >
            <UiIcon 
              :icon-type="feature.iconType || 'checkmark-star'"
              :icon-color="feature.iconColor || '#337168'"
              size="38px"
              alt="checkmark"
            />
            <p class="text-[16px] lg:text-[20px] font-medium">{{ feature.text }}</p>
          </div>
        </div>

        <!-- Support and Providers cards -->
        <div class="pb-12 lg:pb-0 px-8 lg:px-0 mt-12 lg:mt-16 flex flex-col md:flex-row gap-8 justify-center md:justify-around w-full">
          <!-- Support card -->
          <div 
            v-motion 
            :initial="{ opacity: 0, y: 32 }" 
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 400,
                type: 'ease-in',
                stiffness: 250,
                damping: 25,
                mass: 1,
                delay: 350,
              },
            }" 
            class="flex flex-col items-center max-w-[400px]"
          >
            <h3 class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-left md:text-center w-full">
              {{ content?.support?.title || 'Unlimited 24/7 Support Included' }}
            </h3>
            <div class="h-0.5 w-10 bg-accentColor1 mt-0"></div>
            <p class="font-medium mt-4 tracking-tight w-full text-left md:text-center">
              {{ content?.support?.description || 'Medivora provides 24/7 access to a dedicated team of specialists, ensuring you have the support you need around the clock. With unlimited appointments, messaging and support, you can confidently reach out for guidance, ask questions, or address concerns at any time.' }}
            </p>
          </div>

          <!-- Providers card -->
          <div 
            v-motion 
            :initial="{ opacity: 0, y: 32 }" 
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 400,
                type: 'ease-in',
                stiffness: 250,
                damping: 25,
                mass: 1,
                delay: 350,
              },
            }" 
            class="flex flex-col items-center max-w-[400px]"
          >
            <h3 class="text-accentColor1 text-[20px] lg:text-[24px] font-semibold text-left md:text-center w-full">
              {{ content?.providers?.title || 'Hand Selected Providers' }}
            </h3>
            <div class="h-0.5 w-10 bg-accentColor1 mt-0"></div>
            <p class="font-medium mt-4 w-full text-left md:text-center">
              {{ content?.providers?.description || 'Medivora physicians are here to guide you every step of the way, bringing both their expertise and genuine care to keep you supported.' }}
            </p>
            <div class="flex flex-row gap-4 w-full justify-start md:justify-center items-center mt-2">
              <UiIcon 
                :icon-type="content?.providers?.iconType || 'checkmark-star'"
                :icon-color="content?.providers?.iconColor || '#337168'"
                size="28px"
                alt="checkmark"
              />
              <p>{{ content?.providers?.certification || 'Certified doctors and clinicians' }}</p>
            </div>
          </div>
        </div>
      </UiSectionContainer>
    </UiSectionWrapper>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  text: string
  iconType?: string
  iconColor?: string
}

interface AboutStatsContent {
  show: boolean
  title?: string
  features?: Feature[]
  support?: {
    title?: string
    description?: string
  }
  providers?: {
    title?: string
    description?: string
    certification?: string
    iconType?: string
    iconColor?: string
  }
}

const props = defineProps<{
  content?: AboutStatsContent
}>()
</script>

<style scoped>
/* Component styles */
</style>

