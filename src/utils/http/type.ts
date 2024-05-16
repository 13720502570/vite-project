import type {
  AxiosRequestConfig,
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

export type CustomRequestOptions = {
  authenticationScheme?: string
}

export interface MyAxiosOptions extends AxiosRequestConfig {
  customRequestOptions?: CustomRequestOptions
}

export type MyAxiosInterceptor<T> = Parameters<AxiosInterceptorManager<T>['use']>[0]

export type RequestInterceptor = MyAxiosInterceptor<InternalAxiosRequestConfig>
export type ResponseInterceptor = MyAxiosInterceptor<AxiosResponse>
