<template>
  <div class="h-48 flex items-center pl-10" :class="{ 'justify-center': props.collapsed }">
    <img src="@/assets/images/logo.png" class="size-32" />
    <span v-if="!props.collapsed" class="text-17 font-bold ml-8">后台管理系统</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ collapsed: boolean }>()
</script>

<style scoped></style>
