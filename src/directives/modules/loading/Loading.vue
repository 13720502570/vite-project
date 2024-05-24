<template>
  <div
    v-show="loading"
    class="size-full flex justify-center items-center top-0 left-0"
    :style="{ position: fullScreen ? 'fixed' : 'absolute' }"
  >
    <a-spin :spinning="loading" :tip="tip" :size="size" :delay="delay" />
  </div>
</template>

<script setup lang="ts">
export interface LoadingProps {
  loading?: boolean
  tip?: string
  size?: string
  delay?: number
  fullScreen?: boolean
}
defineProps<LoadingProps>()
</script>

<style scoped></style>
