import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import { useRouter, type RouteLocationNormalized } from 'vue-router'

type TabType = {
  route: RouteLocationNormalized
  label: string
  key: string
  noCache: boolean
}

export const useMultipleTabStore = defineStore('multipleTab', () => {
  const router = useRouter()

  const selectedKeys = ref<string[]>([])
  const openKeys = ref<string[]>([])
  const currentTab = ref('')
  // 当前打开的页签列表
  const openTabList = ref<TabType[]>([])
  // 需要缓存的菜单项
  const cachedMenu = computed(() => openTabList.value.filter((v) => !v.noCache).map((v) => v.key))

  const addTab = (tab: TabType) => {
    selectedKeys.value = [tab.key]
    openKeys.value = Array.from(
      new Set([...openKeys.value, ...tab.route.matched.slice(1).map((v) => v.name as string)])
    )
    currentTab.value = tab.key

    const tabList = unref(openTabList)
    const isExist = tabList.findIndex((v) => v.key === tab.key)
    if (isExist === -1) {
      tabList.push(tab)
    }
    openTabList.value = tabList
  }

  const removeTab = (tabKey: string) => {
    openTabList.value = openTabList.value.filter((v) => v.key !== tabKey)
    const tabList = unref(openTabList)
    const isExist = tabList.findIndex((v) => v.key === currentTab.value)
    if (isExist === -1) {
      router.push({ name: tabList[tabList.length - 1].key })
    }
  }

  const resetStore = () => {
    selectedKeys.value = []
    openKeys.value = []
    currentTab.value = ''
    openTabList.value = []
  }
  return {
    selectedKeys,
    openKeys,
    currentTab,
    openTabList,
    cachedMenu,
    addTab,
    removeTab,
    resetStore
  }
})
