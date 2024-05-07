<template>
  <div>
    <a-tabs :activeKey="currentTab" hide-add type="editable-card" @change="change" @edit="edit">
      <a-tab-pane
        v-for="pane in openTabList"
        :key="pane.key"
        :tab="pane.label"
        :closable="pane.key !== HOME_PAGE"
      />
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useMultipleTabStore } from '@/stores/multipleTab'
import type { TabsProps } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { HOME_PAGE } from '@/enums/appEnum'

const multipleTabStore = useMultipleTabStore()
const { currentTab, openTabList } = storeToRefs(multipleTabStore)

const router = useRouter()
const change: TabsProps['onChange'] = (key) => {
  router.push({ name: key as string })
}

const edit: TabsProps['onEdit'] = (key) => {
  multipleTabStore.removeTab(key as string)
}
</script>

<style scoped></style>
