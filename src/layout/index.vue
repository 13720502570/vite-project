<template>
  <a-layout class="h-screen">
    <a-layout-sider v-show="!isMobile" v-model:collapsed="collapsed" theme="light" collapsible>
      <Logo :collapsed="collapsed" />
      <Menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="height: 80px; background: white; padding: 0; line-height: normal">
        <AppSetting v-model:collapsed="collapsed" style="border-bottom: 1px solid #eee" class="h-48 flex" />
        <MultipleTabs class="h-32 overflow-y-hidden" />
      </a-layout-header>
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedMenu">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
      <a-drawer v-if="isMobile" :open="!collapsed" width="210" placement="left" :closable="false"
        :bodyStyle="{ padding: 0 }" class="lg:none" @close="handleClose">
        <Logo />
        <Menu />
      </a-drawer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
import AppSetting from './components/AppSetting.vue'
import MultipleTabs from './components/MultipleTabs.vue'

import { ref, watchEffect } from 'vue'
import { useMultipleTabStore } from '@/stores/multipleTab'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { DrawerProps } from 'ant-design-vue'

const collapsed = ref(false)

const { cachedMenu } = storeToRefs(useMultipleTabStore())

const breakPoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakPoints.smaller('lg')

watchEffect(() => {
  collapsed.value = isMobile.value
})

const handleClose: DrawerProps['onClose'] = () => {
  collapsed.value = true
}
</script>

<style scoped></style>
