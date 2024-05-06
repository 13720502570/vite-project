import type { Nullable } from '@/types'

export enum StorageType {
  l = 'localStorage',
  s = 'sessionStorage'
}

type StorageItem<T> = {
  value: Nullable<T>
}

// TODO: 持久化添加时间限制、添加响应式监听
export const usePersistent = (type: StorageType) => {
  const storage = type === StorageType.l ? window.localStorage : window.sessionStorage

  const set = (key: string, payload: any) => {
    const storageItem: StorageItem<any> = { value: null }
    storageItem.value = payload
    storage.setItem(key, JSON.stringify(storageItem))
  }

  const get = <T>(key: string) => {
    const value = storage.getItem(key)
    if (value) {
      const storageItem = JSON.parse(value)
      return storageItem.value as Nullable<T>
    }
  }

  const remove = (key: string) => {
    storage.removeItem(key)
  }

  const clear = () => {
    storage.clear()
  }

  return {
    set,
    get,
    remove,
    clear
  }
}
