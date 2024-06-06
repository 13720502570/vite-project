<template>
  <div class="h-48px flex items-center pl-2.5" :class="{ 'justify-center': collapsed }">
    <img src="@/assets/images/logo.png" class="size-8" />
    <span v-if="!collapsed" class="text-4 font-bold ml-2">后台管理系统</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ collapsed?: boolean }>(), {
  collapsed: false
})
</script>

<style scoped></style>
