<template>
  <a-menu
    mode="inline"
    :selectedKeys="selectedKeys"
    :openKeys="openKeys"
    :items="menus"
    @click="click"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const { menus, selectedKeys, openKeys } = storeToRefs(appStore)
const router = useRouter()

const click: MenuProps['onClick'] = ({ key }) => {
  router.push({ name: key as string })
}
</script>

<style scoped></style>
