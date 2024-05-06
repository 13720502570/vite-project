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
import { usePermissionStore } from '@/stores/permission'
import { useMultipleTabStore } from '@/stores/multipleTab'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const { menus } = storeToRefs(usePermissionStore())
const { selectedKeys, openKeys } = storeToRefs(useMultipleTabStore())

const router = useRouter()

const click: MenuProps['onClick'] = ({ key }) => {
  router.push({ name: key as string })
}
</script>

<style scoped></style>
