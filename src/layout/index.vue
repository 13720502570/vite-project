<template>
  <a-layout class="h-screen">
    <a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible>
      <Logo :collapsed="collapsed" />
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="height: 80px; background: white; padding: 0; line-height: normal">
        <AppSetting
          v-model:collapsed="collapsed"
          style="border-bottom: 1px solid #eee"
          class="h-48 flex"
        />
        <MultipleTabs class="h-32 overflow-y-hidden" />
      </a-layout-header>
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedMenu">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
import AppSetting from './components/AppSetting.vue'
import MultipleTabs from './components/MultipleTabs.vue'

import { ref } from 'vue'
import { useMultipleTabStore } from '@/stores/multipleTab'

const collapsed = ref(false)

const { cachedMenu } = storeToRefs(useMultipleTabStore())
</script>

<style scoped></style>
