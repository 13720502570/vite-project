<template>
  <div class="flex items-center">
    <div @click="toggleMenuStatus" class="text-16 px-10 cursor-pointer">
      <div class="hidden lg:block">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </div>
      <div class="lg:hidden">
        <MenuOutlined />
      </div>
    </div>
    <div class="hidden lg:block">
      <Breadcrumb />
    </div>
    <div class="h-full ml-auto mr-10">
      <UserDropDown />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons-vue'
import Breadcrumb from './Breadcrumb.vue'
import UserDropDown from './UserDropDown.vue'

const collapsed = defineModel('collapsed')
const toggleMenuStatus = () => (collapsed.value = !collapsed.value)
</script>

<style scoped></style>
