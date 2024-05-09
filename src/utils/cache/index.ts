import { StorageType } from './type'
import { MyStorage } from './MyStorage'

export const LStorage: MyStorage = new MyStorage(StorageType.l)
export const SStorage: MyStorage = new MyStorage(StorageType.s)
