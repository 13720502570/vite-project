<template>
  <div class="h-full">
    <a-space>
      <a-input v-model:value="count" />
      <a-button type="primary" @click="addOne">加一</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue'
import { ref } from 'vue'

const count = ref(0)

const addOne: ButtonProps['onClick'] = () => {
  count.value++
}
</script>

<style scoped></style>
