<template>
  <div
    class="h-full"
    v-loading="loading"
    loading-tip="test"
    loading-size="large"
    loading-delay="100"
  >
    <a-button type="primary" @click="testLoading">测试Loading</a-button>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue'
import { ref } from 'vue'

const loading = ref(false)

const testLoading: ButtonProps['onClick'] = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 3000)
}
</script>

<style scoped></style>
