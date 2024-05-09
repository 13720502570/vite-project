import { StorageType, type StorageItem } from './type'
import dayjs from 'dayjs'

export class MyStorage {
  private storage: Storage

  constructor(type: StorageType) {
    this.storage = type === StorageType.l ? window.localStorage : window.sessionStorage
  }

  set(key: string, value: any, expires: number | boolean = false) {
    const storageItem: StorageItem = { value: null }
    storageItem.value = value
    // 默认不设置过期时间，设置为true时默认取一天，否则取用户手动设置的时间
    if (expires) {
      storageItem.expires = dayjs().valueOf() + (expires === true ? 24 * 60 * 60 * 1000 : expires)
    }
    this.storage.setItem(key, JSON.stringify(storageItem))
  }

  get(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      const storageItem = JSON.parse(value)
      // 如果当前时间大于设置的过期时间
      if (storageItem.expires && dayjs().diff(dayjs(storageItem.expires)) > 0) {
        this.remove(key)
        return null
      }
      return storageItem.value
    }
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
