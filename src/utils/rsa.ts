import JSEncrypt from 'jsencrypt'
import { PUBLIC_KEY, PRIVATE_KEY } from '@/enums/appEnum'

const rsaEncrypt = <T extends string>(data: T) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(PUBLIC_KEY)
  return jsEncrypt.encrypt(data) as T
}

const rsaDecrypt = <T extends string>(data: T) => {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPrivateKey(PRIVATE_KEY)
  return jsEncrypt.decrypt(data) as T
}

export { rsaEncrypt, rsaDecrypt }
