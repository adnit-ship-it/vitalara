<template>
  <UiSectionWrapper class="flex-col py-20">
    <UiSectionContainer>
      <h2 v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
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
      }" class="pb-[24px] font-defaultSerif text-[20px] md:text-[28px] lg:text-[32px] font-semibold text-black">
        {{ reviewsData?.title || 'What Our Customers Have To Say' }}
      </h2>
    </UiSectionContainer>


    <div class="w-full flex flex-col gap-5 md:gap-8">
      <NuxtMarquee  v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
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
      }"  :speed="reviewsData.marquee.speed" :autoFill="true" class="flex gap-8">
        <div class="flex gap-5 md:gap-8">
          <div v-for="review in topReviews" :key="`top-${review.name}`"
            class="min-w-[320px] md:min-w-[492px] max-w-[320px] md:max-w-[492px] h-[136px] md:h-[188px] border-accentColor1 border rounded-[16px] md:rounded-[28px] bg-backgroundColor p-2 md:p-4 flex flex-col gap-5 md:gap-8">
            <div class="flex items-center justify-between">
              <div class="flex gap-[6px] items-center">
                <UiIcon 
                  :icon-src="avatarSrc"
                  :icon-color="avatarColor"
                  :size="isMobile ? '24px' : '32px'"
                  alt="user icon"
                />
                <p class="text-accentColor1 text-[16px] md:text-[24px] font-medium">
                  {{ review.name }}
                </p>
              </div>
              <div class="flex gap-1.5 md:gap-3">
                <UiIcon 
                  v-for="star in review.stars" 
                  :key="star" 
                  :icon-src="starSrc"
                  :icon-color="starColor"
                  :size="isMobile ? '22px' : '28px'"
                  alt="star icon"
                />
              </div>
            </div>
            <p class="text-[16px] md:text-[24px] text-center leading-tight px-2"
              style="white-space: normal !important; word-wrap: break-word !important;">
              "{{ review.review }}"
            </p>
          </div>
        </div>
      </NuxtMarquee>

      <NuxtMarquee  v-motion :initial="{ opacity: 0, y: 32 }" :visible-once="{
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
      }"  :speed="reviewsData.marquee.speed" :direction="'right'" :autoFill="true" class="flex gap-8">
        <div class="flex gap-5 md:gap-8">
          <div v-for="review in bottomReviews" :key="`bottom-${review.name}`"
            class="min-w-[320px] md:min-w-[492px] max-w-[320px] md:max-w-[492px] h-[136px] md:h-[188px] border-accentColor1 border rounded-[16px] md:rounded-[28px] bg-backgroundColor p-2 md:p-4 flex flex-col gap-5 md:gap-8">
            <div class="flex items-center justify-between">
              <div class="flex gap-[6px] items-center">
                <UiIcon 
                  :icon-src="avatarSrc"
                  :icon-color="avatarColor"
                  :size="isMobile ? '24px' : '32px'"
                  alt="user icon"
                />
                <p class="text-accentColor1 text-[16px] md:text-[24px] font-medium">
                  {{ review.name }}
                </p>
              </div>
              <div class="flex gap-1.5 md:gap-3">
                <UiIcon 
                  v-for="star in review.stars" 
                  :key="star" 
                  :icon-src="starSrc"
                  :icon-color="starColor"
                  :size="isMobile ? '22px' : '28px'"
                  alt="star icon"
                />
              </div>
            </div>
            <p class="text-[16px] md:text-[24px] text-center leading-tight px-2"
              style="white-space: normal !important; word-wrap: break-word !important;">
              "{{ review.review }}"
            </p>
          </div>
        </div>
      </NuxtMarquee>
    </div>
  </UiSectionWrapper>

</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

// Static reviews data (no dependency on external JSON content)
const defaultReviewsData = {
  title: 'What Our Customers Have To Say',
  marquee: {
    speed: 50,
  },
  media: {
    avatar: {
      src: '/assets/images/user.svg',
      color: '#337168',
    },
    star: {
      src: '/assets/images/star.svg',
      color: '#D3C984',
    },
  },
  list: [
    { name: 'Jamie L.', stars: 5, review: 'I feel so much more confident in my body thanks to Vitalara.' },
    { name: 'Sarah M.', stars: 5, review: 'The weight loss journey has been incredible. I\'ve never felt better!' },
    { name: 'Michael R.', stars: 5, review: 'Vitalara changed my life. I\'m down 30 pounds and feeling amazing.' },
    { name: 'Emily T.', stars: 5, review: 'Finally found a solution that actually works. Highly recommend!' },
    { name: 'David K.', stars: 5, review: 'The support team is incredible. They\'ve been with me every step.' },
    { name: 'Lisa P.', stars: 5, review: 'I\'ve tried everything before. This is the real deal.' },
    { name: 'Robert W.', stars: 5, review: 'Amazing results in just a few months. I\'m so grateful.' },
    { name: 'Jennifer H.', stars: 5, review: 'The program is so easy to follow. I love the results!' },
    { name: 'Thomas B.', stars: 5, review: 'Best decision I ever made for my health and confidence.' },
    { name: 'Amanda F.', stars: 5, review: 'I can\'t believe how much my life has changed. Thank you Vitalara!' },
    { name: 'Jessica R.', stars: 5, review: 'The transformation has been incredible. I feel like a new person.' },
    { name: 'Christopher L.', stars: 5, review: 'Finally found something that works for me. Amazing results!' },
    { name: 'Nicole M.', stars: 5, review: 'I\'m so happy with my progress. This program is life-changing.' },
    { name: 'Kevin S.', stars: 5, review: 'The support and results are beyond my expectations.' },
    { name: 'Rachel G.', stars: 5, review: 'I\'ve never felt more confident and healthy in my life.' },
    { name: 'Daniel T.', stars: 5, review: 'This is exactly what I needed. The results speak for themselves.' },
    { name: 'Melissa K.', stars: 5, review: 'I\'m amazed at how much I\'ve accomplished. Thank you!' },
    { name: 'Andrew P.', stars: 5, review: 'The best investment I\'ve ever made in myself.' },
    { name: 'Stephanie W.', stars: 5, review: 'I can\'t recommend this enough. It\'s truly life-changing.' },
    { name: 'Brandon H.', stars: 5, review: 'The results have exceeded all my expectations. Incredible!' },
  ],
}

const reviewsData = computed(() => defaultReviewsData)
const reviews = computed(() => reviewsData.value.list)

// Split reviews into two arrays for top and bottom rows
const topReviews = computed(() => reviews.value.slice(0, Math.ceil(reviews.value.length / 2)))
const bottomReviews = computed(() => reviews.value.slice(Math.ceil(reviews.value.length / 2)))

const avatarColor = computed(() => reviewsData.value.media.avatar.color)
const starColor = computed(() => reviewsData.value.media.star.color)
const avatarSrc = computed(() => reviewsData.value.media.avatar.src)
const starSrc = computed(() => reviewsData.value.media.star.src)

const isMobile = ref(false)
const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 768
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
  }
})
</script>
