export enum StorageType {
  l = 'localStorage',
  s = 'sessionStorage'
}

export interface StorageItem {
  value: any
  expires?: number
}
