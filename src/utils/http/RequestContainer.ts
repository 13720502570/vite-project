import type { InternalAxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'

const getRequestKey = (config: InternalAxiosRequestConfig) => {
  return [config.method, config.url, dayjs().valueOf()].join('&')
}
const requestMap = new Map<string, AbortController>()

export class RequestContainer {
  addRequest(config: InternalAxiosRequestConfig) {
    if (config) {
      const requestKey = getRequestKey(config)
      const controller = new AbortController()
      requestMap.set(requestKey, controller)
      config.headers.requestKey = requestKey
      config.signal = controller.signal
    }
    return config
  }

  removeRequest(config: InternalAxiosRequestConfig) {
    if (config) {
      const requestKey = config.headers.requestKey
      if (requestMap.has(requestKey)) {
        const controller = requestMap.get(requestKey)!
        controller && controller.abort()
      }
      requestMap.delete(requestKey)
    }
  }

  removeAllRequest() {
    requestMap.forEach((v) => {
      v && v.abort()
    })
    this.clear()
  }

  clear() {
    requestMap.clear()
  }
}

export const requestContainer = new RequestContainer()
