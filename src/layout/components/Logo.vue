<template>
  <div class="h-48px flex items-center pl-10px">
    <img src="@/assets/svg/logo.svg" class="size-32px" />
    <span v-if="!props.collapsed" class="text-17px font-bold">后台管理系统</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ collapsed: boolean }>()
</script>

<style scoped></style>
