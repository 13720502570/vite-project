export enum StorageType {
  l = 'localStorage',
  s = 'sessionStorage'
}

type StorageItem = {
  value: any
}

export const usePersistent = (type: StorageType) => {
  const storage = type === StorageType.l ? window.localStorage : window.sessionStorage

  const set = (key: string, payload: any) => {
    const storageItem: StorageItem = { value: null }
    storageItem.value = payload
    storage.setItem(key, JSON.stringify(storageItem))
  }

  const get = (key: string) => {
    const value = storage.getItem(key)
    if (value) {
      const storageItem: StorageItem = JSON.parse(value)
      return storageItem.value
    }
  }

  const remove = (key: string) => {
    storage.removeItem(key)
  }

  return {
    set,
    get,
    remove
  }
}
