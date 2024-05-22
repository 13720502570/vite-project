import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type {
  MyAxiosOptions,
  CustomRequestOptions,
  RequestInterceptor,
  ResponseInterceptor
} from './type'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { message as messageApi } from 'ant-design-vue'
import { requestContainer } from './RequestContainer'

/* 
  1.定义一个请求、响应拦截器数组
  2.实际请求之前逆序注册请求拦截器，顺序注册响应拦截器
  3.在请求拦截器数组的末尾添加默认的通用的请求配置
  4.在响应拦截器注册之前，添加状态码处理拦截器，在响应拦截器注册之后，添加数据处理拦截器
*/

export class MyAxios {
  private axiosInstance: AxiosInstance
  // 自定义请求配置
  private requestOptions: CustomRequestOptions
  // 逆序保存请求拦截器
  private requestInterceptorArray: RequestInterceptor[] = []
  // 保存响应拦截器
  private responseInterceptorArray: ResponseInterceptor[] = []
  // 发送请求前判断拦截器是否已全部注册
  private register: boolean = false

  constructor(options: MyAxiosOptions) {
    const { customRequestOptions, ...rest } = options
    this.axiosInstance = axios.create(rest)
    this.requestOptions = customRequestOptions || {}
    // 添加默认拦截器
    this.initInterceptor()
  }

  // 请求头默认配置，根据customRequestOptions配置项决定是否开启
  private requestHandler(config: InternalAxiosRequestConfig) {
    // 生成并保存当前请求的取消对象
    config = requestContainer.addRequest(config)

    // 请求头添加凭证
    const { authenticationScheme } = this.requestOptions
    const userStore = useUserStore()
    const token = userStore.getToken()
    config.headers.Authorization = authenticationScheme ? authenticationScheme + ' ' + token : token
    return config
  }

  // 响应错误状态码处理
  private responseErrorHandler(error: any) {
    const { response, config, message, code } = error || {}
    requestContainer.removeRequest(config)

    // 请求被取消
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    if (message?.includes?.('Network Error')) {
      messageApi.error('网络异常，请检查您的网络连接是否正常！')
      return Promise.reject(error)
    }
    if (message?.includes?.('timeout') || code === 'ECONNABORTED') {
      messageApi.error('接口请求超时，请刷新页面重试！')
      return Promise.reject(error)
    }
    switch (response?.status) {
      case 401:
        messageApi.warning('登陆已过期，请重新登录！')
        const userStore = useUserStore()
        userStore.removeToken()
        router.push({ path: '/login', replace: true })
        break
      case 404:
        messageApi.error('网络请求错误，未找到该资源！')
        break
      case 500:
        messageApi.error('服务器错误，请联系管理员！')
        break
      default:
        messageApi.error(message)
        break
    }
    return Promise.reject(error)
  }

  initInterceptor() {
    this.requestInterceptorArray.push(this.requestHandler.bind(this))
    this.responseInterceptorArray.push((response) => Promise.resolve(response.data))
  }

  addRequestInterceptor(requestInterceptor: RequestInterceptor) {
    // axios请求拦截器默认按照注册顺序倒序执行，响应拦截器则是顺序执行，为了开发方便，在此将请求拦截器按添加顺序逆序注册，保持和响应拦截器的统一
    this.requestInterceptorArray.unshift(requestInterceptor)
    return this
  }

  addResponseInterceptor(responseInterceptor: ResponseInterceptor) {
    this.responseInterceptorArray.splice(
      this.responseInterceptorArray.length - 1,
      0,
      responseInterceptor
    )
    return this
  }

  private setupInterceptor() {
    if (!this.register) {
      // 注册请求拦截器
      this.requestInterceptorArray.forEach((v) => this.axiosInstance.interceptors.request.use(v))
      // 注册默认响应拦截器
      this.axiosInstance.interceptors.response.use((response) => {
        requestContainer.removeRequest(response.config)
        return response
      }, this.responseErrorHandler)
      // 注册响应拦截器
      this.responseInterceptorArray.forEach((v) => this.axiosInstance.interceptors.response.use(v))
      this.register = true
    }
    return this
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.setupInterceptor().axiosInstance.get(url, config)
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.setupInterceptor().axiosInstance.post(url, data, config)
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.setupInterceptor().axiosInstance.post(url, config)
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.setupInterceptor().axiosInstance.post(url, data, config)
  }
}
