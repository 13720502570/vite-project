<template>
  <div class="h-full">
    <a-space>
      <a-select class="w-120px" v-model:value="food" :options="foodOptions" @change="change" />
      <span>当前选中的食物为{{ food }}</span>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { ref } from 'vue'

const food = ref<string | undefined>(undefined)

const foodOptions = ref<SelectProps['options']>([
  { label: '米饭', value: '米饭' },
  { label: '面条', value: '面条' }
])

const change: SelectProps['onChange'] = (value) => {
  food.value = value as string
}
</script>

<style scoped></style>
