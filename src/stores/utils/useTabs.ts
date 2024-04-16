import { StorageType, usePersistent } from '@/utils/persistent'
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'

type tabType = {
  label: string
  key: string
  noCache: boolean
}
export const useTabs = () => {
  const currentTab = ref('')
  // 当前打开的页签
  const cachedTabList = ref<tabType[]>([])

  // 获取持久化对象
  const persistent = usePersistent(StorageType.s)

  const getCachedTabList = () => (cachedTabList.value = persistent.get('cachedTabList') || [])

  const addTab = (tab: tabType) => {
    currentTab.value = tab.key
    const tabList = unref(cachedTabList)
    const isExist = tabList.findIndex((v) => v.key === tab.key)
    if (isExist === -1) {
      tabList.push(tab)
    }
    persistent.set('cachedTabList', tabList)
    cachedTabList.value = tabList
  }

  const router = useRouter()
  const removeTab = (tabKey: string) => {
    cachedTabList.value = cachedTabList.value.filter((v) => v.key !== tabKey)
    const tabList = unref(cachedTabList)
    persistent.set('cachedTabList', tabList)
    const isExist = tabList.findIndex((v) => v.key === currentTab.value)
    if (isExist === -1) {
      router.push({ name: tabList[tabList.length - 1].key })
    }
  }

  return {
    currentTab,
    cachedTabList,
    getCachedTabList,
    addTab,
    removeTab
  }
}
