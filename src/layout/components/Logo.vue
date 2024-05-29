<template>
  <div class="h-48 flex items-center pl-10" :class="{ 'justify-center': collapsed }">
    <img src="@/assets/images/logo.png" class="size-32" />
    <span v-if="!collapsed" class="text-17 font-bold ml-8">后台管理系统</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ collapsed?: boolean }>(), {
  collapsed: false
})
</script>

<style scoped></style>
