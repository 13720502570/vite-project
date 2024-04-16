<template>
  <div>
    <a-tabs :activeKey="currentTab" hide-add type="editable-card" @change="change" @edit="edit">
      <a-tab-pane
        v-for="pane in cachedTabList"
        :key="pane.key"
        :tab="pane.label"
        :closable="pane.key !== HOME_PAGE"
      />
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import type { TabsProps } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { HOME_PAGE } from '@/enum/appEnum'

const appStore = useAppStore()
const { currentTab, cachedTabList } = storeToRefs(appStore)

const router = useRouter()
const change: TabsProps['onChange'] = (key) => {
  router.push({ name: key as string })
}

const edit: TabsProps['onEdit'] = (key) => {
  appStore.removeTab(key as string)
}
</script>

<style scoped></style>
