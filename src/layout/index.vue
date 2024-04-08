<template>
  <a-layout class="h-screen">
    <a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible>
      <Logo :collapsed="collapsed" />
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="height: 80px; background: white; padding: 0; line-height: normal">
        <div style="border-bottom: 1px solid #eee" class="h-48px">头部</div>
      </a-layout-header>
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<style scoped></style>
