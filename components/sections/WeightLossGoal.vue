<template>
  <section v-if="content?.show" class="w-full h-[480px] lg:h-[632px] max-w-screen flex justify-center px-4 my-16 lg:my-32 text-bodyColor">
    <div
      class="h-full lg:w-[960px] bg-[#F5F3ED] border border-accentColor1 gap-4 lg:gap-8 rounded-3xl lg:rounded-[52px] flex flex-col justify-center items-center px-4 lg:px-32">
      <h2 class="text-[28px] lg:text-[32px] font-semibold text-center lg:text-left">
        {{ content?.title || "What's Your Weight Loss Goal?" }}
      </h2>
      <div class="flex w-full flex-col gap-3 lg:gap-5">
        <div 
          v-for="(option, index) in options" 
          :key="index" 
          @click="selectGoal(index)"
          class="w-full cursor-pointer rounded-lg lg:rounded-xl text-[20px] lg:text-[24px] font-medium h-[48px] lg:h-[68px] flex items-center justify-center border transition-all duration-200"
          :class="[
            selectedGoal === index
              ? 'bg-accentColor1 text-white'
              : 'bg-white text-accentColor1 border-accentColor1'
          ]">
          {{ option }}
        </div>
      </div>
      <NuxtLink class="mt-6" :to="content?.buttonLink || '/consultation'">
        <button
          class="h-[40px] lg:h-[48px] w-[284px] lg:w-[320px] text-[22px] lg:text-[24px] flex items-center justify-center font-medium transition-colors rounded-full px-2 md:px-6 bg-accentColor1 text-white cursor-pointer">
          {{ content?.buttonText || 'Take the Assessment' }}
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface WeightLossGoalContent {
  show: boolean
  title?: string
  options?: string[]
  buttonText?: string
  buttonLink?: string
}

const props = defineProps<{
  content?: WeightLossGoalContent
}>()

// Default options if not provided
const defaultOptions = [
  'Light: 1-20 lbs',
  'Medium: 25-50 lbs',
  'High: 50+ lbs',
  'Not sure, exploring options'
]

const options = computed(() => props.content?.options || defaultOptions)

// Selected weight loss goal (null means none selected)
const selectedGoal = ref<number | null>(null)

// Function to select weight loss goal
const selectGoal = (index: number) => {
  selectedGoal.value = index
  // Optionally navigate immediately or wait for button click
  // navigateTo('/consultation')
}
</script>

<style scoped>
/* Component styles */
</style>

