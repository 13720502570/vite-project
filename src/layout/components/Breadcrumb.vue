<template>
  <div>
    <a-breadcrumb :routes="currentRoute.matched">
      <template #itemRender="{ route }">
        <span v-if="currentRoute.matched.indexOf(route) === currentRoute.matched.length - 1">
          {{ route.meta.title }}
        </span>
        <router-link v-else :to="{ name: route.name }">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const { currentRoute } = useRouter()
</script>

<style scoped></style>
