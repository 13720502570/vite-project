import { ContentTypeEnum } from '@/enums/httpEnum'
import { MyAxios } from './MyAxios'
import { message } from 'ant-design-vue'

// 根据项目需要进行配置
const http = new MyAxios({
  baseURL: '',
  timeout: 10 * 1000,
  headers: { 'Content-Type': ContentTypeEnum.JSON }
})

http.addRequestInterceptor((config) => {
  // 根据项目需要添加自定义请求头
  return config
})

http.addResponseInterceptor((response) => {
  // TODO：根据项目实际数据结构进行处理
  const res = response.data
  if (res.code === '0') {
    return response
  } else {
    message.error(res.message)
    return Promise.reject(res.message)
  }
})
export { http }
