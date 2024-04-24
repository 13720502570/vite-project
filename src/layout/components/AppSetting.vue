<template>
  <div class="flex items-center">
    <div @click="toggleMenuStatus" class="text-16px px-10px cursor-pointer">
      <MenuUnfoldOutlined v-if="collapsed" /> <MenuFoldOutlined v-else />
    </div>
    <div>
      <Breadcrumb />
    </div>
    <div class="h-full ml-auto mr-10px">
      <UserDropDown />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import Breadcrumb from './Breadcrumb.vue'
import UserDropDown from './UserDropDown.vue'

const collapsed = defineModel('collapsed')
const toggleMenuStatus = () => (collapsed.value = !collapsed.value)
</script>

<style scoped></style>
