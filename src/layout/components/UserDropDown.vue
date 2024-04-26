<template>
  <div class="h-full flex items-center">
    <a-dropdown placement="bottomLeft">
      <div class="flex items-center p-10 cursor-pointer hover:bg-[#f6f6f6]">
        <a-avatar :src="userUrl" />
        <span class="ml-10">Vue3</span>
      </div>
      <template #overlay>
        <a-menu mode="inline" :items="menus" @click="click" />
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import userUrl from '@/assets/images/user.jpg'
import { h, ref } from 'vue'
import type { ItemType } from 'ant-design-vue'
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface'
import { PoweroffOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

enum MenuFunction {
  loginOut = 'loginOut'
}
const menus = ref<ItemType[]>([
  {
    key: MenuFunction.loginOut,
    icon: () => h(PoweroffOutlined),
    label: '退出登录',
    title: '退出登录'
  }
])

const router = useRouter()

const click: MenuClickEventHandler = ({ key }) => {
  switch (key) {
    case MenuFunction.loginOut:
      loginOut()
      break
  }
}

const loginOut = () => {
  const appStore = useAppStore()
  appStore.removeToken()
  router.push('/login')
}
</script>

<style scoped></style>
